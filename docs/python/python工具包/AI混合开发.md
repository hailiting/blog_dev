# AI混合开发

共享message

```py
from llm_config import create_client
from typing import Any, Dict, List, Optional

def show(content):
  try:
    from IPython.display import Markdown, display  # type: ignore

    display(Markdown(content))
  except Exception:
    print(content)

def call_llm(
  prompt: str,
  *,
  provider: str,
  model: Optional[str] = None,
  history: Optional[List[Dict[str, Any]]] = None,
  temperature: float = 0.6,
) -> str:
  history = history if history is not None else []
  history.append({"role": "user", "content": prompt})
  client, cfg = create_client(provider)
  use_model = model or cfg.default_model
  if not use_model:
    raise RuntimeError(f"No model provided and provider '{provider}' has no default_model in llm_config.json")
  response = client.chat.completions.create(
    model=use_model,
    messages=history,
    temperature=temperature,
  )
  reply = response.choices[0].message.content or ""
  history.append({"role": "assistant", "content": reply})
  return reply

def main():
  # mode = "compare": 同一个问题分别问多个模型（各自独立 history，便于对比）
  # mode = "relay":   多个模型共享同一段对话 history（接力式问答）
  mode = "compare"

  providers = [
    ("deepseek", "deepseek-chat"),
    ("api2d", "o3-mini"),
  ]

  prompts = [
    "你好，我叫李雷，1+1等于多少？",
    "你好，我叫韩梅梅，2+2等于多少？",
  ]

  if mode == "relay":
    history = []
    for prompt in prompts:
      for provider, model in providers:
        reply = call_llm(prompt, provider=provider, model=model, history=history)
        show(f"**{provider}/{model}**\n\n{reply}")
  else:
    # compare（默认）：每个 provider 各自维护对话历史；同一轮 prompt 会分别问一遍
    histories = {provider: [] for provider, _ in providers}
    for prompt in prompts:
      for provider, model in providers:
        reply = call_llm(prompt, provider=provider, model=model, history=histories[provider])
        show(f"**{provider}/{model}**\n\n{reply}")
if __name__ == "__main__":
  main()
```
