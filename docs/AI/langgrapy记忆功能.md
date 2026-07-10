# LangGraph 记忆功能

LangGraph 的「记忆」本质上是 **Checkpoint（检查点）持久化**：每次图执行后，将 `State` 快照保存下来，下次用同一个 `thread_id` 调用时自动恢复上下文。

```
用户消息 → graph.invoke(state, config) → 节点执行 → checkpointer.put() 保存快照
                                              ↓
下一轮对话 → checkpointer.get_tuple() 恢复 → 继续执行
```

## 核心概念

| 概念 | 说明 |
|------|------|
| `checkpointer` | 持久化后端，编译图时传入 `builder.compile(checkpointer=...)` |
| `thread_id` | 会话主键，同一 ID 共享记忆，不同 ID 相互隔离 |
| `checkpoint_id` | 单次快照 ID，支持时间旅行调试、回滚到历史状态 |
| `InMemorySaver` | 进程内缓存，重启丢失，适合开发调试 |
| `RedisSaver` / `MongoDBSaver` | 生产级持久化，支持多实例共享状态 |

**关键 config 格式：**

```python
config = {"configurable": {"thread_id": "user-001"}}
graph.invoke({"messages": [...]}, config)
```

---

## 缓存记忆（InMemorySaver）

开发阶段最快的方式，数据存在内存中，进程结束即丢失。

```bash
uv add langgraph langchain-core
```

```python
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import StateGraph, MessagesState, START, END
from langchain_core.messages import HumanMessage

# 1. 创建 checkpointer
checkpointer = InMemorySaver()

# 2. 定义节点
def call_model(state: MessagesState):
    # 实际项目中替换为 llm.invoke(state["messages"])
    last = state["messages"][-1].content
    return {"messages": [{"role": "assistant", "content": f"收到: {last}"}]}

# 3. 构建并编译图
builder = StateGraph(MessagesState)
builder.add_node("call_model", call_model)
builder.add_edge(START, "call_model")
builder.add_edge("call_model", END)
graph = builder.compile(checkpointer=checkpointer)

# 4. 多轮对话 —— 同一 thread_id 共享记忆
config = {"configurable": {"thread_id": "session-1"}}

graph.invoke({"messages": [HumanMessage(content="我叫 Bob")]}, config)
graph.invoke({"messages": [HumanMessage(content="我叫什么名字?")]}, config)

# 5. 查看当前状态
snapshot = graph.get_state(config)
print(snapshot.values["messages"])

# 6. 查看历史 checkpoint 列表（时间旅行）
for state in graph.get_state_history(config):
    print(state.config["configurable"]["checkpoint_id"], state.metadata["step"])
```

---

## Redis 记忆

> 原文档写的「radius」应为 **Redis** 的笔误。

Redis 适合高并发、低延迟场景。注意：`langgraph-checkpoint-redis` 依赖 **Redis Stack**（内置 RediSearch + RedisJSON 模块），普通 `redis` 镜像不够用。

### Mac Docker 安装 Redis Stack

```bash
# 拉取 Redis Stack 镜像（含 RediSearch / RedisJSON）
docker pull redis/redis-stack:latest

# 启动，6379 为 Redis 端口，8001 为 RedisInsight 可视化界面
docker run -d \
  --name redis-stack \
  -p 6379:6379 \
  -p 8001:8001 \
  redis/redis-stack:latest

# 验证
docker exec -it redis-stack redis-cli ping
# 应返回 PONG
```

浏览器访问 `http://localhost:8001` 可使用 RedisInsight 查看数据。

### LangGraph 与 Redis 结合

```bash
uv add langgraph langgraph-checkpoint-redis
```

```python
from langgraph.checkpoint.redis import RedisSaver
from langgraph.graph import StateGraph, MessagesState, START
from langchain_core.messages import HumanMessage

DB_URI = "redis://localhost:6379"

with RedisSaver.from_conn_string(DB_URI) as checkpointer:
    # 首次使用必须 setup，创建 RediSearch 索引
    checkpointer.setup()

    def call_model(state: MessagesState):
        return {"messages": [{"role": "assistant", "content": "ok"}]}

    builder = StateGraph(MessagesState)
    builder.add_node("call_model", call_model)
    builder.add_edge(START, "call_model")
    graph = builder.compile(checkpointer=checkpointer)

    config = {"configurable": {"thread_id": "redis-thread-1"}}

    graph.invoke({"messages": [HumanMessage(content="hi")]}, config)
    graph.invoke({"messages": [HumanMessage(content="继续")]}, config)

    # 直接读取 checkpoint
    cp = checkpointer.get_tuple(config)
    print(cp.checkpoint["channel_values"])
```

**异步版本：**

```python
from langgraph.checkpoint.redis.aio import AsyncRedisSaver

async with AsyncRedisSaver.from_conn_string("redis://localhost:6379") as checkpointer:
    await checkpointer.asetup()
    graph = builder.compile(checkpointer=checkpointer)
    await graph.ainvoke({"messages": [...]}, config)
```

### Redis 版本兼容问题解决

| 问题 | 原因 | 解决 |
|------|------|------|
| `setup()` 报错 `unknown command 'FT.CREATE'` | 使用了普通 Redis，缺少 RediSearch | 换用 `redis/redis-stack` 镜像 |
| `langgraph-checkpoint-redis` 安装失败 | Python 版本过低 | 需要 Python >= 3.10 |
| 连接被拒绝 | 端口未映射或容器未启动 | `docker ps` 确认 6379 端口 |
| 多实例状态不一致 | 各实例连了不同 Redis | 统一 `redis://host:6379`，可用 `redis://:password@host:6379` |

```bash
# 查看已安装的 langgraph 相关包版本
uv pip list | grep langgraph
```

---

## MongoDB 记忆

MongoDB 适合需要持久化大量 checkpoint 历史、且已有 MongoDB 基础设施的场景。

### 安装依赖

```bash
uv add langgraph langgraph-checkpoint-mongodb pymongo
```

### Mac Docker 安装 MongoDB

```bash
docker pull mongo:7

docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  mongo:7

# 验证连接
docker exec -it mongodb mongosh -u root -p root --authenticationDatabase admin
```

### 本地 mongosh 客户端（非 Docker 内连接）

```bash
brew tap mongodb/brew
brew install mongodb-community-shell

mongosh --host 127.0.0.1:27017 -u root -p root --authenticationDatabase admin
```

### LangGraph 与 MongoDB 结合

```python
from langgraph.checkpoint.mongodb import MongoDBSaver
from langgraph.graph import StateGraph, MessagesState, START
from langchain_core.messages import HumanMessage

# 带认证的连接串
MONGODB_URI = "mongodb://root:root@localhost:27017/?authSource=admin"

with MongoDBSaver.from_conn_string(MONGODB_URI) as checkpointer:
    def call_model(state: MessagesState):
        return {"messages": [{"role": "assistant", "content": "ok"}]}

    builder = StateGraph(MessagesState)
    builder.add_node("call_model", call_model)
    builder.add_edge(START, "call_model")
    graph = builder.compile(checkpointer=checkpointer)

    config = {"configurable": {"thread_id": "mongo-thread-1"}}

    graph.invoke({"messages": [HumanMessage(content="你好")]}, config)
    graph.invoke({"messages": [HumanMessage(content="继续聊")]}, config)

    # 列出该 thread 的所有 checkpoint
    for cp in checkpointer.list(config):
        print(cp.checkpoint["id"], cp.metadata.get("step"))
```

**异步版本：**

```python
from langgraph.checkpoint.mongodb.aio import AsyncMongoDBSaver

async with AsyncMongoDBSaver.from_conn_string(MONGODB_URI) as checkpointer:
    graph = builder.compile(checkpointer=checkpointer)
    await graph.ainvoke({"messages": [...]}, config)
```

### MongoDB 数据存储结构

`MongoDBSaver` 默认使用两个 collection：

| Collection | 内容 |
|------------|------|
| `checkpoints` | 完整 checkpoint 快照 |
| `checkpoint_writes` | 节点执行中的增量写入 |

### MongoDB 版本兼容问题解决

| 问题 | 解决 |
|------|------|
| `Authentication failed` | 连接串加 `authSource=admin`，用户名密码与 `MONGO_INITDB_ROOT_*` 一致 |
| `pymongo` 版本冲突 | `uv add "pymongo>=4.6"` |
| MongoDB 4.x 连接问题 | 建议升级到 MongoDB 5.0+，镜像用 `mongo:7` |
| ARM Mac 拉镜像慢 | `docker pull --platform linux/amd64 mongo:7` |

### 数据库可视化工具

- **Navicat Premium**：图形化管理，支持 MongoDB / Redis / MySQL 等
- **MongoDB Compass**：官方免费客户端，`brew install --cask mongodb-compass`
- **RedisInsight**：Redis Stack 自带，端口 `8001`

---

## 文件持久化

不想引入外部数据库时，可以自定义 `BaseCheckpointSaver`，将 checkpoint 序列化为 JSON 文件。LangGraph 也内置了 `SqliteSaver`（`langgraph-checkpoint-sqlite`）作为轻量文件方案。

### 内置 SqliteSaver（推荐轻量方案）

```bash
uv add langgraph-checkpoint-sqlite
```

```python
from langgraph.checkpoint.sqlite import SqliteSaver

with SqliteSaver.from_conn_string("checkpoints.db") as checkpointer:
    graph = builder.compile(checkpointer=checkpointer)
    graph.invoke({"messages": [...]}, {"configurable": {"thread_id": "1"}})
```

### 自定义文件 Checkpointer

继承 `BaseCheckpointSaver`，实现以下关键方法：

| 方法 | 作用 |
|------|------|
| `get_tuple` | 根据 config 恢复最新（或指定）checkpoint |
| `put` | 写入完整 checkpoint 快照 |
| `put_writes` | 写入节点执行过程中的增量数据 |
| `list` | 列出某 thread 的历史 checkpoint |

```python
import json
import os
from pathlib import Path
from typing import Iterator, Optional, Sequence

from langgraph.checkpoint.base import (
    BaseCheckpointSaver,
    Checkpoint,
    CheckpointMetadata,
    CheckpointTuple,
    ChannelVersions,
)
from langgraph.checkpoint.serde.jsonplus import JsonPlusSerializer

class FileCheckpointSaver(BaseCheckpointSaver):
    """将 checkpoint 以 JSON 文件形式持久化到本地目录。"""

    def __init__(self, base_dir: str = "./checkpoints"):
        super().__init__(serde=JsonPlusSerializer())
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def _thread_dir(self, thread_id: str) -> Path:
        d = self.base_dir / thread_id
        d.mkdir(parents=True, exist_ok=True)
        return d

    def _checkpoint_path(self, thread_id: str, checkpoint_id: str) -> Path:
        return self._thread_dir(thread_id) / f"{checkpoint_id}.json"

    def get_tuple(self, config: dict) -> Optional[CheckpointTuple]:
        thread_id = config["configurable"]["thread_id"]
        checkpoint_id = config["configurable"].get("checkpoint_id")

        thread_path = self._thread_dir(thread_id)
        files = sorted(thread_path.glob("*.json"))
        if not files:
            return None

        # 未指定 checkpoint_id 时取最新
        if checkpoint_id:
            target = thread_path / f"{checkpoint_id}.json"
            if not target.exists():
                return None
            data = json.loads(target.read_text(encoding="utf-8"))
        else:
            data = json.loads(files[-1].read_text(encoding="utf-8"))

        return CheckpointTuple(
            config=data["config"],
            checkpoint=data["checkpoint"],
            metadata=data["metadata"],
            parent_config=data.get("parent_config"),
            pending_writes=data.get("pending_writes", []),
        )

    def put(
        self,
        config: dict,
        checkpoint: Checkpoint,
        metadata: CheckpointMetadata,
        new_versions: ChannelVersions,
    ) -> dict:
        thread_id = config["configurable"]["thread_id"]
        checkpoint_id = checkpoint["id"]

        new_config = {
            "configurable": {
                **config["configurable"],
                "checkpoint_id": checkpoint_id,
            }
        }

        payload = {
            "config": new_config,
            "checkpoint": checkpoint,
            "metadata": metadata,
            "parent_config": config,
            "pending_writes": [],
        }

        path = self._checkpoint_path(thread_id, checkpoint_id)
        path.write_text(
            json.dumps(payload, default=str, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        return new_config

    def put_writes(
        self,
        config: dict,
        writes: Sequence[tuple],
        task_id: str,
        task_path: str = "",
    ) -> None:
        """增量写入：追加到对应 checkpoint 文件的 pending_writes。"""
        thread_id = config["configurable"]["thread_id"]
        checkpoint_id = config["configurable"].get("checkpoint_id")
        if not checkpoint_id:
            return

        path = self._checkpoint_path(thread_id, checkpoint_id)
        if not path.exists():
            return

        data = json.loads(path.read_text(encoding="utf-8"))
        data.setdefault("pending_writes", []).append({
            "task_id": task_id,
            "task_path": task_path,
            "writes": [(c, self.serde.dumps_typed(v)) for c, v in writes],
        })
        path.write_text(
            json.dumps(data, default=str, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    def list(
        self,
        config: Optional[dict],
        *,
        filter: Optional[dict] = None,
        before: Optional[dict] = None,
        limit: Optional[int] = None,
    ) -> Iterator[CheckpointTuple]:
        if not config:
            return

        thread_id = config["configurable"]["thread_id"]
        files = sorted(self._thread_dir(thread_id).glob("*.json"))

        if before and "configurable" in before:
            before_id = before["configurable"].get("checkpoint_id", "")
            files = [f for f in files if f.stem < before_id]

        if limit:
            files = files[-limit:]

        for f in files:
            data = json.loads(f.read_text(encoding="utf-8"))
            yield CheckpointTuple(
                config=data["config"],
                checkpoint=data["checkpoint"],
                metadata=data["metadata"],
                parent_config=data.get("parent_config"),
                pending_writes=data.get("pending_writes", []),
            )
```

**使用自定义 FileCheckpointSaver：**

```python
from langgraph.graph import StateGraph, MessagesState, START
from langchain_core.messages import HumanMessage

file_saver = FileCheckpointSaver(base_dir="./my_checkpoints")

builder = StateGraph(MessagesState)
builder.add_node("call_model", call_model)
builder.add_edge(START, "call_model")
graph = builder.compile(checkpointer=file_saver)

config = {"configurable": {"thread_id": "file-thread-1"}}
graph.invoke({"messages": [HumanMessage(content="第一轮")]}, config)
graph.invoke({"messages": [HumanMessage(content="第二轮")]}, config)

# 文件结构:
# ./my_checkpoints/file-thread-1/<checkpoint_id>.json
```

---

## 方案选型对比

| 方案 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| `InMemorySaver` | 本地开发、单元测试 | 零配置、最快 | 重启丢失、无法多实例 |
| `RedisSaver` | 高并发在线服务 | 低延迟、支持 TTL | 需 Redis Stack |
| `MongoDBSaver` | 企业级、需审计历史 | 持久可靠、易查询 | 运维成本较高 |
| `SqliteSaver` | 单机小项目 | 单文件、零运维 | 不适合高并发写入 |
| 自定义文件 | 特殊存储需求 | 完全可控 | 需自己保证一致性 |

---

## 常用 API 速查

```python
# 获取当前状态
graph.get_state(config)

# 获取历史状态列表（时间旅行）
list(graph.get_state_history(config))

# 回滚到某个 checkpoint 继续执行
old_config = {
    "configurable": {
        "thread_id": "1",
        "checkpoint_id": "某个历史 checkpoint_id",
    }
}
graph.invoke(None, old_config)  # 从该快照恢复

# 更新状态（不经过 LLM，直接写入）
graph.update_state(config, {"messages": [HumanMessage(content="注入的消息")]})

# 删除某 thread 的全部记忆（MongoDB / Redis 支持）
checkpointer.delete_thread("thread_id")
```

---

## 参考链接

- LangGraph Memory 官方文档：https://docs.langchain.com/oss/python/langgraph/add-memory
- `langgraph-checkpoint-redis`：https://github.com/redis-developer/langgraph-redis
- `langgraph-checkpoint-mongodb`：https://langchain-mongodb.readthedocs.io
- `BaseCheckpointSaver` API：https://langchain-ai.github.io/langgraph/reference/checkpoints/
