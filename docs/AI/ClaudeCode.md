# Claude Code 入门教程（macOS）

Claude Code 是 Anthropic 推出的 **AI 编程助手**，在终端里和你对话，能读项目、改代码、跑命令、做 Git 操作。和 Cursor 类似，但它是独立 CLI，不依赖 VS Code。

官方文档：[Quickstart](https://code.claude.com/docs/en/quickstart) · [终端新手指南](https://code.claude.com/docs/en/terminal-guide) · [安装说明](https://code.claude.com/docs/en/setup) · [MCP](https://code.claude.com/docs/en/mcp) · [Skills](https://code.claude.com/docs/en/skills)

---

## 使用前你需要准备什么

| 项目 | 说明                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------- |
| 系统 | **macOS 13.0+**（Ventura 及以上）。苹果菜单 → 关于本机 可查看版本                                           |
| 内存 | 建议 4 GB 以上                                                                                              |
| 网络 | 需能访问 Anthropic 服务；部分地区不可用                                                                     |
| 账号 | **Claude Pro / Max / Team / Enterprise**，或 [Claude Console](https://console.anthropic.com/)（API 预付费） |
| 注意 | **免费版 Claude.ai 不含 Claude Code**                                                                       |

不想用终端？可装 [桌面版](https://claude.ai/api/desktop/darwin/universal/dmg/latest/redirect)（图形界面，无需敲命令）。

---

## 第一步：打开终端

macOS 自带终端，不用额外安装。

1. 按 `Cmd + Space` 打开 Spotlight
2. 输入 `Terminal`（或「终端」）
3. 回车

你会看到一个带闪烁光标的窗口，后面所有命令都在这里输入。

---

## 第二步：安装 Claude Code

### 方式一：官方脚本（推荐）

复制下面整行，在终端里粘贴（`Cmd + V`），回车：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

安装过程中会有滚动输出，成功后会看到类似 **「Claude Code successfully installed!」** 的提示。

- 安装位置一般在 `~/.local/bin`
- **会自动后台更新**，一般不用自己升级

### 方式二：Homebrew

已安装 [Homebrew](https://brew.sh/) 时可用：

```bash
# 稳定版（略滞后，但更稳）
brew install --cask claude-code

# 或始终最新版
brew install --cask claude-code@latest
```

Homebrew **不会自动更新**，需要时执行：

```bash
brew upgrade claude-code
# 或
brew upgrade claude-code@latest
```

### 验证是否安装成功

```bash
claude --version
```

更完整的自检：

```bash
claude doctor
```

---

## 第三步：登录账号

在项目目录或任意位置启动：

```bash
claude
```

首次运行会提示登录：

1. 按提示在浏览器里用 Claude 账号登录
2. 登录成功后，凭证会保存在本机，下次一般不用再登

会话里也可以输入：

```text
/login
```

切换账号同样用 `/login`。

### 大陆用户怎么 `/login`

**中国大陆不在 Anthropic 支持地区**，直连 `claude.ai` / `api.anthropic.com` 会失败（安装脚本出现 HTML、`App unavailable in region`，或登录后 `403` / `unsupported country`）。
**`/login` 的用法和海外一样**，差别在于：终端 + 浏览器都要走 **可访问 Anthropic 的网络**（常见是系统代理 / VPN，节点选香港、新加坡、日本、美国等，**不要选「仅规则」却漏掉终端**）。

#### 推荐流程（Claude Pro / Max 订阅）

**1. 先让终端走代理**（以 Clash 为例，端口按你本机实际改，常见 `7890`）：

```bash
# 当前终端会话生效（zsh）
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890   # 若 Clash 提供 SOCKS，可选

# 验证能否访问（应返回非 403 的响应，而不是地区错误页）
curl -I https://api.anthropic.com
```

也可在 Clash 里开 **「增强模式 / TUN」**，让终端流量自动出国，则不必每次 `export`。

**2. 启动并登录**：

```bash
claude          # 首次会自动走登录；已登出过则输入 /login
```

**3. 按终端提示操作**：

- 一般会 **自动打开浏览器** 完成 OAuth
- 若浏览器没弹出：在 Claude Code 里按 **`c`**，复制登录链接，粘贴到 **已开代理的浏览器** 打开
- 若浏览器只显示 **一串登录码**、无法跳回终端：把码 **粘贴回终端** 里 `Paste code here if prompted` 处（WSL/SSH 也适用）
- 仍失败可试：`claude auth login`（从标准输入读登录码）

**4. 确认登录方式**（在 Claude Code 里输入）：

```text
/status
```

应显示为订阅 OAuth，而不是错误的 API Key。

**5. 以后每次用**：只要 **代理/VPN 仍开着**，直接 `claude` 即可；凭证在 macOS 会存在钥匙串，一般不用天天 `/login`。

#### 常见报错

| 现象                                          | 处理                                                                    |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| 安装时出现 HTML / `App unavailable in region` | 安装时也要 `export https_proxy=...`，或开 TUN 后再装                    |
| `/login` 后 `403` / `unsupported country`     | 终端或浏览器有一边没走代理；两边都开代理后 `/logout` 再 `/login`        |
| `OAuth error: Invalid code`                   | 登录码过期或复制不全；尽快粘贴，或 `claude auth login` 重试             |
| 已设置 `ANTHROPIC_API_KEY` 却登录失败         | 订阅用户先 `unset ANTHROPIC_API_KEY`，再 `/login`（API Key 优先级更高） |

#### 不想用 `/login`（OAuth）的替代方案

| 方式                       | 适合谁             | 说明                                                                                                                                                                                     |
| -------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claude Console API Key** | 有 Console、能付费 | [Console](https://console.anthropic.com/) 创建 Key，`export ANTHROPIC_API_KEY=sk-ant-...` 后运行 `claude`（仍需代理访问 API）                                                            |
| **Amazon Bedrock**         | 有 AWS、企业       | 区域用 **`us-east-1` / `ap-southeast-1` 等**，**不要用 `cn-northwest-1` 等中国区**；`claude` → 选 3rd-party → Bedrock，见 [Bedrock 文档](https://code.claude.com/docs/en/amazon-bedrock) |
| **Google Vertex AI**       | 有 GCP             | 区域选 **新加坡等境外**，见 [Vertex 文档](https://code.claude.com/docs/en/google-vertex-ai)                                                                                              |
| **API 中转 / 网关**        | 已有合规中转       | 设置 `ANTHROPIC_BASE_URL` 指向网关，按服务商文档配 Key                                                                                                                                   |

大陆用户 **最常见、也最省事** 的路径仍是：**代理 + 已有 Claude Pro/Max 账号 + `/login`**。

#### 用 DeepSeek 接 Claude Code（大陆常见）

不走 `/login`，改用 [DeepSeek Anthropic 兼容接口](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)。**模型名必须小写**，与官方一致：

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<你的 DeepSeek API Key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
# 可选：降低「思考力度」可加快回复
# export CLAUDE_CODE_EFFORT_LEVEL=medium

# 避免启动时仍去连 api.anthropic.com 拖慢或卡住
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

改完后 **关掉当前 claude，新开终端** 再 `claude`。输入 `/status` 确认走的是 DeepSeek。

**为什么一直 `Doing...` 几十秒？**

| 原因                       | 说明                                                     |
| -------------------------- | -------------------------------------------------------- |
| 模型名写错                 | `DeepSeek-V4-Pro` 无效，应用 `deepseek-v4-pro[1m]`       |
| 只配了 1～2 个变量         | 子任务/后台还会调别的模型，缺变量会重试或挂起            |
| 首条消息也在扫项目         | 即使用户只打 `hello`，Claude Code 也可能读目录、建上下文 |
| DeepSeek 兼容层 + 工具调用 | 比直连 Anthropic 慢，复杂仓库更明显                      |
| 网络                       | `api.deepseek.com` 慢或超时；可 `curl` 测延迟            |
| 仍连官方域名               | 加 `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1`          |

自检（新开终端，先 export 再执行）：

```bash
curl -s -o /dev/null -w "%{http_code} %{time_total}s\n" \
  -H "Authorization: Bearer $ANTHROPIC_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-pro[1m]","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}' \
  https://api.deepseek.com/anthropic/v1/messages
```

超过 10s 仍无响应：按 `Esc` 中断，查 DeepSeek 控制台余额与 Key，或换节点/代理。

#### 报错：`Could not load the default credentials`（Google Cloud）

说明 Claude Code 当前按 **Google Vertex AI** 在鉴权，**不是** DeepSeek / Anthropic。常见原因：曾选过「3rd-party → Vertex」、`/setup-vertex`，或 `~/.claude/settings.json` 里写了 `CLAUDE_CODE_USE_VERTEX=1`，但未配置 GCP 登录。

**你要用 DeepSeek 时，按下面做：**

```bash
# 1. 退出 Claude Code 后，在终端取消 Vertex / GCP 相关变量
unset CLAUDE_CODE_USE_VERTEX
unset GOOGLE_APPLICATION_CREDENTIALS
unset GOOGLE_CLOUD_PROJECT
unset GCLOUD_PROJECT
unset ANTHROPIC_VERTEX_PROJECT_ID
unset CLOUD_ML_REGION

# 2. 再设 DeepSeek（见上一节完整 export）
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<你的 DeepSeek API Key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

# 3. 新开终端启动
claude
```

在 Claude Code 里输入 `/status`，应看到 **API via ANTHROPIC_BASE_URL（DeepSeek）**，而不是 Vertex。

**若 settings 里写死了 Vertex**：编辑 `~/.claude/settings.json`，删掉 `env` 中的 `CLAUDE_CODE_USE_VERTEX`、`ANTHROPIC_VERTEX_PROJECT_ID`、`CLOUD_ML_REGION` 等 GCP 项，保存后重启 `claude`。

**若你本来就要用 Vertex**（有 GCP 账号）：执行 `gcloud auth application-default login`，并设置 `ANTHROPIC_VERTEX_PROJECT_ID` 与 `CLOUD_ML_REGION`，见 [Vertex 文档](https://code.claude.com/docs/en/google-vertex-ai)。

---

## 第四步：进入你的项目

```bash
cd /path/to/your/project   # 换成你的项目路径
claude
```

启动后会看到欢迎界面、最近对话等。输入 `/help` 查看内置命令。

---

## 日常怎么用（小白向）

### 和 Claude 说话

在 Claude Code 里 **用自然语言打字**，回车发送即可。例如：

```text
这个项目是做什么的？
```

```text
技术栈有哪些？入口文件在哪？
```

```text
给 main 文件加一个 hello world 函数
```

改代码前 Claude 通常会 **先展示方案并征求同意**；你可以逐条批准，或在本会话里开启「全部接受」。

### 常用启动方式

| 命令                       | 作用                     |
| -------------------------- | ------------------------ |
| `claude`                   | 进入交互模式             |
| `claude "修复构建错误"`    | 一次性执行任务后结束     |
| `claude -p "解释这个函数"` | 单次提问后退出           |
| `claude -c`                | 继续当前目录最近一次对话 |
| `claude -r`                | 从历史对话里恢复         |

### 会话内常用命令

| 输入                 | 作用             |
| -------------------- | ---------------- |
| `/help`              | 帮助             |
| `/clear`             | 清空当前对话历史 |
| `/login`             | 重新登录         |
| `/resume`            | 继续之前的对话   |
| `exit` 或 `Ctrl + D` | 退出 Claude Code |

输入 `/` 可查看全部斜杠命令和 Skills。

### 快捷键（终端里）

- `Tab`：命令补全
- `↑`：上一条输入
- `Esc`：中断 Claude 正在执行的操作
- `Shift + Tab`：切换权限模式（是否自动批准改文件等）

### Git 也可以口语化

```text
我改了哪些文件？
```

```text
用一句清楚的英文帮我 commit
```

```text
新建分支 feature/login
```

---

## 写好提示词的小技巧

1. **尽量具体**
   - 差：`修一下 bug`
   - 好：`登录输错密码后出现白屏，帮我修`

2. **复杂任务分步**

   ```text
   1. 建 user_profiles 表
   2. 写获取/更新资料的 API
   3. 做一个简单的前端页面
   ```

3. **先让它理解再动手**
   ```text
   先分析数据库 schema，再建议怎么加字段
   ```

---

## 和 Cursor 怎么选（简单对比）

|          | Claude Code                       | Cursor                   |
| -------- | --------------------------------- | ------------------------ |
| 形态     | 终端 CLI / 桌面 / VS Code 插件    | IDE 一体化               |
| 适合     | 习惯终端、想轻量、CI 自动化       | 喜欢图形界面、多文件编辑 |
| 项目配置 | `CLAUDE.md`、`.claude/skills/` | `.cursor/rules`、`.cursor/skills/` |
| MCP 配置 | `.mcp.json`、`claude mcp add` | `~/.cursor/mcp.json` 或项目 `.cursor/mcp.json` |

两者可以并存：本机装 Claude Code 写脚本/自动化，日常用 Cursor 也行。**MCP 与 Skill 都遵循开放标准，但配置文件路径不同，不能自动共用同一份 JSON**（见下文）。

---

## MCP（Model Context Protocol）

**MCP** 是让 AI 连接外部工具的开放协议：数据库、GitHub、Notion、浏览器、自建 API 等，以「工具」形式供 Agent 调用，避免你反复复制粘贴到对话里。

- 协议介绍：https://modelcontextprotocol.io/
- Claude Code 官方：https://code.claude.com/docs/en/mcp
- 与 Skill 的关系：**Skill** = 教 Agent「怎么做」的说明书；**MCP** = 提供「能调用的能力」（查库、发 Issue 等）。常一起用。

### 能做什么（举例）

```text
根据 JIRA ENG-4521 的描述实现功能并开 PR
查 PostgreSQL 里用过某功能的 10 个用户邮箱
按 Figma 新稿更新邮件模板
```

### 三种接入方式（传输）

| 类型 | 适用 | Claude Code 命令示例 |
| --- | --- | --- |
| **HTTP**（推荐） | 云端远程服务 | `claude mcp add --transport http notion https://mcp.notion.com/mcp` |
| **SSE** | 旧服务（已逐步弃用） | `claude mcp add --transport sse asana https://mcp.asana.com/sse` |
| **stdio** | 本机进程、脚本 | `claude mcp add --transport stdio --env KEY=xxx mysrv -- npx -y some-mcp-server` |

注意：`claude mcp add` 里 **所有选项要在服务器名前面**，命令写在 `--` 后面，例如：

```bash
claude mcp add --transport stdio --env AIRTABLE_API_KEY=你的key airtable -- npx -y airtable-mcp-server
```

### 配置写在哪（作用域）

| 作用域 | 存哪 | 是否适合提交 Git |
| --- | --- | --- |
| **local**（默认） | `~/.claude.json` 里按项目路径记录 | 否，仅本机当前项目 |
| **project** | 项目根目录 **`.mcp.json`** | 是，团队共享 |
| **user** | `~/.claude.json` 全局 | 否，你所有项目可用 |

项目级 `.mcp.json` 示例（stdio）：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"],
      "env": {}
    }
  }
}
```

远程 HTTP 示例：

```json
{
  "mcpServers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```

文档里 `type` 也可写 `streamable-http`，与 `http` 等价。

### 常用命令

```bash
claude mcp list              # 列出已配置服务器
claude mcp get <name>        # 查看详情
claude mcp remove <name>     # 删除
claude mcp add --scope project ...   # 写入项目 .mcp.json
```

在 **Claude Code 会话内**：

```text
/mcp          # 查看连接状态、工具数量、OAuth 登录
```

需要 OAuth 的远程服务，在 `/mcp` 面板里按提示授权。首次加载项目里的 `.mcp.json` 时，Claude Code 会要求你 **批准** 该服务器（防恶意配置）。

### 和 Claude Code 的 MCP 能否共用？

| 项目 | Claude Code | Cursor |
| --- | --- | --- |
| 协议 | 同为 MCP 标准 | 同为 MCP 标准 |
| 配置文件 | `.mcp.json`（项目）、`~/.claude.json` | `~/.cursor/mcp.json` 或 `.cursor/mcp.json` |
| 是否同文件 | ❌ 路径不同，需各配一份或自己同步 | ❌ |

同一 MCP 服务在两边各写一份 JSON；改完 Cursor 配置后 **完全退出并重启 Cursor** 才生效。

---

### Cursor 里配置 MCP（macOS 示例）

官方文档：https://cursor.com/docs/context/mcp

#### 配置文件放哪

| 范围 | 路径 | 说明 |
| --- | --- | --- |
| **全局** | `~/.cursor/mcp.json` | 所有项目可用 |
| **项目** | `.cursor/mcp.json` | 仅当前仓库，可提交 Git（勿提交密钥） |

也可用图形界面：**Cursor Settings**（`Cmd + Shift + J`）→ **Features → Model Context Protocol**，点添加 / 开关。市场：[Cursor Marketplace](https://cursor.com/marketplace)、社区 [cursor.directory](https://cursor.directory/)。

#### 示例 1：本机文件系统（适合博客仓库）

只允许 Agent 访问指定目录（建议用 `${workspaceFolder}` 绑定当前项目根）：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "${workspaceFolder}"
      ]
    }
  }
}
```

保存为 **`.cursor/mcp.json`**（放在 `blog_dev` 根目录的 `.cursor` 文件夹里）。Agent 对话里可让它「列出 docs 下有哪些 md」等。

#### 示例 2：抓取网页（Fetch）

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

#### 示例 3：GitHub（Token 走环境变量）

终端先导出（不要写进 JSON 再提交 Git）：

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_你的token
```

`~/.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

#### 示例 4：PostgreSQL

```bash
export DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
```

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${env:DATABASE_URL}"
      }
    }
  }
}
```

#### 示例 5：远程 HTTP 服务（带 Bearer）

```json
{
  "mcpServers": {
    "my-api": {
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:MY_SERVICE_TOKEN}"
      }
    }
  }
}
```

需要 OAuth 的远程服务可在条目里加 `auth`（`CLIENT_ID` / `CLIENT_SECRET`），回调地址固定为 `cursor://anysphere.cursor-mcp/oauth/callback`，见官方 [Static OAuth](https://cursor.com/docs/context/mcp#static-oauth-for-remote-servers)。

#### 变量插值（推荐）

Cursor 会在 `command`、`args`、`env`、`url`、`headers` 里解析：

| 写法 | 含义 |
| --- | --- |
| `${env:API_KEY}` | 读 shell / 系统环境变量 |
| `${workspaceFolder}` | 含 `.cursor/mcp.json` 的项目根 |
| `${userHome}` | 用户主目录 |

密钥 **只用 `${env:...}`**，不要明文写在仓库里的 `mcp.json`。

#### 在对话里怎么用

1. 重启 Cursor 后，Agent 面板 **Available Tools** 里应出现 MCP 工具  
2. 直接说需求，例如：`用 filesystem 列出 docs/AI 下的文件`  
3. 默认 **每次调用前要你点批准**；可在 Settings 里开 **Auto-run**（慎用）  
4. 排错：**Output**（`Cmd + Shift + U`）→ 下拉选 **MCP Logs**

#### 与本仓库对照

本仓库可提供模板 **`.cursor/mcp.json.example`**（无密钥），复制为 `.cursor/mcp.json` 再按需改：

```bash
mkdir -p .cursor
cp .cursor/mcp.json.example .cursor/mcp.json
# 编辑后重启 Cursor；若含密钥，把 mcp.json 加入 .gitignore
```

#### Claude Code 与 Cursor 同服务对照

| 能力 | Cursor（`.cursor/mcp.json`） | Claude Code |
| --- | --- | --- |
| 读项目内文件 | 示例 1 `filesystem` + `${workspaceFolder}` | `claude mcp add --transport stdio ... -- npx -y @modelcontextprotocol/server-filesystem <路径>` |
| GitHub | 示例 3 + `GITHUB_PERSONAL_ACCESS_TOKEN` | 同上，`server-github` |
| 远程 HTTP | `"url": "..."` + `headers` | `claude mcp add --transport http name <url> --header "Authorization: Bearer ..."` |

### 安全注意

- 只连接你信任的 MCP 源；项目 `.mcp.json` 进 Git 前检查是否含密钥（密钥放环境变量，用 `--env` 或 `env` 字段引用）
- 外部内容可能带来 **提示注入** 风险，见官方 [Security](https://code.claude.com/docs/en/security)

### 和 LangChain 笔记的对应

`AI项目核心技术.md` 里提到的 MCP（stdio / SSE / streamable_http）与这里一致；Claude Code 侧 **远程优先 HTTP**，stdio 适合本机工具。

---

## macOS 常见问题

### 1. `command not found: claude`

**先关掉终端窗口，重新开一个**，再试 `claude`。

仍不行时，把安装目录加入 PATH（你用的是 zsh，macOS 默认）：

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
claude
```

### 2. 安装时出现 `syntax error` 或一堆 HTML

说明安装脚本地址返回了网页而不是脚本。可：

- 检查网络 / 代理
- 若页面提示地区不可用，见 [支持国家列表](https://www.anthropic.com/supported-countries)
- 改用 Homebrew：`brew install --cask claude-code`

### 3. `dyld` / `built for Mac OS X 13.0`

系统版本低于 macOS 13，需要升级系统（系统设置 → 通用 → 软件更新）。

### 4. 登录失败

- 确认账号是 Pro/Max/Team/Enterprise 或 Console，不是免费版
- 运行 `claude doctor` 看诊断信息
- 官方排错：[Troubleshoot install](https://code.claude.com/docs/en/troubleshoot-install)

---

## 更新与卸载

**官方脚本安装**：一般自动更新；也可查看 [发布渠道配置](https://code.claude.com/docs/en/setup#configure-release-channel)。

**Homebrew 安装**：`brew upgrade claude-code`。

卸载参考官方 [Advanced setup - Uninstall](https://code.claude.com/docs/en/setup)。

---

## 其他使用方式（可选）

不想长期待在终端里，还可以：

- [桌面应用](https://code.claude.com/docs/en/desktop-quickstart)
- [VS Code 扩展](https://code.claude.com/docs/en/vs-code)
- [JetBrains 插件](https://code.claude.com/docs/en/jetbrains)
- 网页：[claude.ai/code](https://claude.ai/code)
- CI：[GitHub Actions](https://code.claude.com/docs/en/github-actions)

---

## 推荐学习路径

1. 按本文完成安装 + 登录
2. 在自己项目里问：`这个项目是做什么的？`
3. 做小改动：`给 README 加一段安装说明`
4. 读官方 [Best practices](https://code.claude.com/docs/en/best-practices) 和 [Common workflows](https://code.claude.com/docs/en/common-workflows)
5. 需要团队规范时，在项目根目录添加 `CLAUDE.md` 描述代码风格和约定
6. 接数据库 / 工单 / 文档：配置 `.mcp.json` 或 `claude mcp add`，会话里用 `/mcp` 检查

---

## 参考链接

- 安装与系统要求：https://code.claude.com/docs/en/setup
- 快速上手：https://code.claude.com/docs/en/quickstart
- 终端零基础：https://code.claude.com/docs/en/terminal-guide
- CLI 完整命令：https://code.claude.com/docs/en/cli-reference
- **MCP 接入**：https://code.claude.com/docs/en/mcp
- **Skills**：https://code.claude.com/docs/en/skills
- MCP 协议：https://modelcontextprotocol.io/
- 定价：https://claude.com/pricing

## 提示语

- 项目需求文档
  - 前端页面
  - 后端接口
  - 数据库 ...
- 请在项目根目录生成整个项目说明文档: 包括使用技术栈、业务功能、项目启动、注意点等内容
- 请给我生成一个window脚本 可以让我一键启动该项目前端和后端，如果对应端口存在需要先ki对应端口的进程

## Skills 与 Agent（补充）

> MCP 见上文 **「MCP（Model Context Protocol）」** 一节；与 Cursor 共用 Skill 放 `.claude/skills/`。

- https://clawhub.ai/skills
- Create skills in 项目级`.claude/skills/<技能名>/SKILL.md` or 系统级的`~/.claude/skills/<技能名>/SKILL.md`
- Skill: 可复用的指令集
  - 重复性的事情：
    - 每天早上8点，读取某个网站的内容
      - Site
      - 爬取 Script
      - 总结 LLM
      - 发邮件 Email
- DeepAgent
- Skill规范
  - skill_name
    - SKILL.md # 必须
    - scripts/ # 可选
    - references/ # 可选
    - assets/ # 可选

```md
---
name: explain-code
description: 用可视化图表和类比方式解释代码。当解释代码工作原理、教授代码库知识或用户询问"这是如何工作的?"时使用   "/explain-code @xxx.xxx"  分析当前代码
---

# 代码解释指南

当解释代码时，请始终包含以下内容:

## 1. 从生活类比开始

将代码概念与现实生活场景联系起来，帮助建立直观理解

## 2. 绘制图表

使用 ASCII 艺术来展示流程、结构或关系

## 3. 逐行分析

按执行顺序逐步解释代码功能，特别是关键逻辑部分

## 4. 常见陷阱提醒

指出可能遇到的常见问题、边界情况或需要注意的地方

## 5. 实际应用场景

说明这个代码在实际项目中如何使用，解决什么问题

保持解释的对话感和层次感，对于复杂概念使用多个类比从不同角度说明。
```
