# AI项目核心技术

- 大模型
  - 阿里云百炼大模型 通义千问，DeepSeek
  - Claude4/GPT4
  - Ollama
- AI 框架
  - LangChain
    - prompts, message, runnable, output_parses, tools, memory, mcp, agents
      - Runnables
        - 可运行的链式组件。统一了各种Chain, Tool, LLM/ChatModel, Prompt 等的调用方式
  - LangGraph
    - graph, state, node/edge, 6大智能体协同架构
  - MCP
    - stdio, sse, streamable_http, mcp市场
    - File Tools
  - LangSmith / Langfuse
- 智能体工具
  - Terminal/PowerShell 终端控制
  - Chrome 浏览器控制
  - LangChain 内置工具：DB Peri File
- 知识库
  - 阿里云百炼知识库
- AI IDE
  - Cursor
  - 通义灵码
  - Trae
- Lima VM(Agent Runtime Sandbox 智能体运行时沙盒)
## 智能体

openai / manus / 沉思
**自主感知环境、做出决策并执行行动的系统或程序**
1986年

- 自主性
- 反应性
- 交互性/社交性
- 适应性/主动性
- 学习能力

## 架构

- [Node Server] HTTP服务
- [Python Code] AI服务
- LangGraph
  - Agent...
    - LLM Text2Text -> bind -> Tools
      - Tools call Function
      - Tools fetch MCP
      - Tools search RAG

- 大模型 【调用工具、知识库】
  - 本地部署
    - Ollama
      - Deepseek r1
      - qwen3
  - 远程调用
    - 阿里云百炼
      - qwen3 qwq qvq
  - python 大模型调用方法
- 工具
  - Function Calling
  - MCP工具
  - LangChain内置工具
  - 复杂工具
    - 浏览器控制
    - 终端控制
- 智能体 React架构
- 工作流
  - LangGraph
  - Dify
  - Coze
  - ComfyUI

### LangChain介绍

- 地址
  - python 版本: https://python.langchain.com/
  - nodejs 版本: https://js.langchain.com/
- github
  - https://github.com/langchain-ai/langchain
  - https://github.com/langchain-ai/langchainjs
- 核心功能
  - 模型 Models: 提供统一接口调用各种LLM，如OpenAl的GPT系列、Anthropic的Claude系列、Google的Gemini系列，以及Hugging Face的开源模型。
  - 提示(Prompts):优化模型输入，提升生成结果的质量，包括PromptTemplate、ChatPromptTemplate和FewShotPromptTemplate等。
  - 链(Chains):封装多个组件的调用序列，创建复杂的工作流程，如SimpleSequentialChain等
  - 代理(Agents):允许模型自主调用外部工具和组件，实现多步骤任务处理，如AutoGPT和BabyAGI
  - 记忆(Memory):存储和检索对话数据，支持上下文感知的应用，如多轮对话系统。
  - 索引(Indexes):组织和检索文档数据，支持RAG(检索增强生成)等应用场景。

```py
# 提示词模板
from langchain_core.prompts import ChatPromptTemplate, ChatMessagePromptTemplate


llm = ChatOpenAI(
    model="deepseek-v4-pro",
    base_url="https://api.deepseek.com",
    api_key=SecretStr(_api_key),
    streaming=True,
)

# 参数是 Tuple 对象
chat_prompt_template = ChatPromptTemplate.from_meassages([
  ("system", "你是一名{role}专家，擅长回答{domain}领域的问题"),
  ("user", "用户问题{question}")
])
prompt = chat_prompt_template.format_messages(role="法律", domain="合同", question="合同纠纷怎么解决？")

# message: SystemMessage, AIMessage, HumanMessage, ToolMessage

# ChatMessagePromptTemplate 可以结合 ChatPromptTemplate 使用，同时对提示词模板和消息体进行抽象和复用
system_template = ChatMessagePromptTemplate.from_template(
  template="你是一名{role}专家，擅长回答{domain}领域的问题",
  role="system"
)
human_template = ChatMessagePromptTemplate.from_template(
  template="用户问题：{question}",
  role="human"
)
chat_prompt = ChatPrompTemplate.from_messages([
  system_template,
  human_template,
])
messages = chat_prompt.format_message(
  role="技术",
  domain="Web开发",
  question="如何构建一个基于Vue的前端应用？"
)
print(messages)
# FewShotPromptTemplate 少样本提示模板
# - 用于少样本学习 Few-Shot Learning ，在提示中包含示例（Examples）,帮助模型理解任务
# - 适用于复杂任务（如 翻译、分类、推理），需要通过示例引导模型行为
examples = [
  {"input": "将'Hello'翻译成中文", "output": "你好"},
  {"input": "将'Goodbye'翻译成中文", "output": "再见"},
]
example_template='输入：{input}\n输出：{output}' # 示例中替换的部分
few_shot_prompt_template = FewShotPromptTemplate(
  examples = examples,
  examples_prompt = PromptTemplate.from_template(example_template),
  prefixe="请将以下英文翻译成中文", # 前置内容
  suffix="输入：{text}\n输出：", # 后置
  input_veriables=["text"],
)
promt = few_shot_prompt_template.format(text="Thank you!")
# 从左到右依次执行
chain = few_shot_prompt_template | llm
```

## Python 环境搭建

### Anaconda

https://anaconda.com/ 下载

`conda env list`

- conda,miniconda, anaconda区别
- 切换python版本

```sh
python --version
conda activate python11
python --version
which python
conda activate base
```

### UV

python 包管理工具UV: https://github.com/astral-sh/uv
installation | uv: https://docs.astral.sh/uv/getting-started/installation/

`pip install uv`

```sh
uv init ai-agent-test
cd ai-agent-test
uv add pyyaml
uv add langchain_openai
# 类型注释的验证与解析库
uv add pydantic
# /Volumes/hahaha/hailiting/study/demo/ai-agent-test/.venv/lib/python3.13/site-packages
```

#### uv配置阿里云源

- 在 `pyproject.toml`中添加

```toml
[[tool.uv.index]]
url="https://mirrors.aliyun.com/pypi/simple/"
default=true
```

- 或 `uv.toml` 中添加

```toml
[[index]]
url="https://mirrors.aliyun.com/pypi/simple/"
default=true
```

### PyCharm

https://www.jetbrains.com.cn/pycharm/download

## 调用大模型

### 本地 - ollama

- ollama 开源的本地化大语言模型 LLM 运行和管理工具
  - https://ollama.com/download

```sh
ollama serve

lsof -i :11434

ollama run kimi-k2.6:cloud
ollama pull llama3.2
ollama ls
ollama run kimi-k2.6:cloud
ollama rm kimi-k2.6:cloud

pip install -qU langchain-ollama
uv add langchain-ollama
```

- 调用Ollama 大模型
  使用langchain-ollama 库：https://python.langchain.com/docs/integrations/providers/ollama/

```py
from langchain_ollama import ChatOllama

llm = ChatOllama(
  model="llama3.2:latest",  # 使用本地模型
  temperature=0, # 只越大回答的越发散
  base_url="http://localhost:11434",  # 默认值，可省略
)
resp = llm.invoke("你是谁?")
# resp = llm.invoke("Who are you?")
print(resp)

# 流式
resp = llm.stream(message)
for chunk in resp:
  print(chunk.content, end="")
```
## 智能体开发流程
- 初始化工具
- 初始化大模型
  - `llm = ChatOpenAI(xxx)`
- 创建智能体
  - `agent = initialize_agent(xxx)`
- 调用智能体
  - `agent.invoke(messages)`
### PythonREPL
~~~py
from langchain.agents import initialize_agent, AgentType
from langchain_core.prompts import PromptTemplate
from langchain_experimental.tools.python.tool import PythonREPLTool

from app.bailian.common import llm

# 定义工具
tools = [PythonREPLTool()]
tool_names = ["PythonREPLTool"]

# 创建智能体
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

# 创建提示词模板
prompt_template = PromptTemplate.from_template(template="""
尽你所能回答用户的问题或执行用户的命令，你可以使用以下工具：[{tool_names}]
--
请按照以下格式返回结果：
```
# 思考的过程
- 问题：你必须回答的问题
- 思考：你考虑应该怎么做
- 行动：要采取的行动，应该是[{tool_names}]中的一个
- 行动输入：行动的输入
- 观察：行动的结果
...（这个思考/行动/行动输入/观察可以重复N次）
# 最终答案
对原始输入问题的最终答案
```
--
注意：
- PythonREPLTool工具的入参是python代码，不允许添加 ```py 标记
--
要求：{input}
~~~
### output_parser
~~~py
from langchain_core.output_parsers import StrOutputParser, CommaSeparatedListOutputParser, JsonOutputParser
from langchain.output_parsers import BooleanOutputParser, DatetimeOutputParser
from langchain_core.prompts import ChatPromptTemplate

from app.bailian.common import chat_prompt_template, llm

# parser = StrOutputParser() # 字符串解析器
# parser = CommaSeparatedListOutputParser() # 逗号分隔列表解析器
# parser = BooleanOutputParser() # 布尔值解析器
# parser = JsonOutputParser() # JSON解析器
parser = DatetimeOutputParser() # 日期时间解析器
instructions = parser.get_format_instructions()

chain = chat_prompt_template | llm | parser

prompt = ChatPromptTemplate.from_messages([
    ("system", f"必须按照以下格式返回日期时间：{instructions}"),
    ("human", "请将以下自然语言转换为标准日期时间格式：{text}")
])

chain = prompt | llm | parser

resp = chain.invoke({"text": "二零二五年五月一日上午十点十分"})

print(resp)
~~~
## MCP
- 核心原理：将互联网服务（谷歌、高德）或本地操作系统API（文件系统、数据库、终端）封装成AI智能体能够理解和使用的tools工具。
### MCP 通讯方式
- stdio 标准输入输出
  - 1. 创建 mcp server
  - 2. 启动 mcp server
  - 3. 开发 mcp client
    - 3.1 定义stdio server 参数
    - 3.2 读取 stdio mcp tools
    - 3.3 定义智能体，加载mcp tool
  - 4. 启动智能体
- SSE Server-Sent Events
- Streamable HTTP 流式HTTP
~~~py
# mcp_stdio_server.py
from mcp.server.fastmcp import FastMCP
mcp = FastMCP("Math Tools")
@mcp.tool()
def add(a:int, b:int)-> int:
  """Add two numbers"""
  return a+b
@mcp.tool()
def multiply(a:int, b:int)-> int:
  """Multiply two numbers"""
  return a*b
if __name__ == "__main__":
  mcp.run(transport="stdio")


# mcp_stdio_client.py
import asyncio
import sys
from pathlib import Path

from langchain.agents import create_agent
from langchain_mcp_adapters.tools import load_mcp_tools
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from app.bailian.common import llm

_SERVER_SCRIPT = Path(__file__).with_name("mcp_stdio_server.py")


async def create_mcp_stdio_client():
    server_params = StdioServerParameters(
        command=sys.executable,
        args=[str(_SERVER_SCRIPT)],
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            tools = await load_mcp_tools(session)
            print(tools)

            agent = create_agent(
                model=llm,
                tools=tools,
                debug=True,
            )

            resp = await agent.ainvoke(
                {"messages": [{"role": "user", "content": "1 + 2 * 5 = ?"}]}
            )

            final = resp["messages"][-1]
            print("\n=== 最终回答 ===")
            print(final.content)
            return resp


if __name__ == "__main__":
    asyncio.run(create_mcp_stdio_client())
~~~

## Playwright
https://www.npmjs.com/package/@executeautomation/playwright-mcp-server
`npm install -g @executeautomation/playwright-mcp-server`

要求安装Chromium的解决方法 `npx playwright install`
~~~md
<!-- Claude Desktop 配置 -->
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
~~~
## 多轮对话
- 构建session级别的多轮对话能力
  - LCEL(LangChain Expression Language) ：LangChain的乐高积木语法
    - 提示词 **ChatPromptTemplate**
      - MessagePlaceholder
        - `MessagesPlaceholder(variable_name="chat_history")`
    - 大语言模型 LLM
    - 输出 StrOutParser
  - get_session_history: 用于获取指定session_id的对话信息
    - ChatMessageHistory 用于存储历史对话信息
  - session_id: 一轮会话的唯一标识
