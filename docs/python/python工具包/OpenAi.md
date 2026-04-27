# OpenAi

```json
{
  "providers": {
    "deepseek": {
      "api_key_env": "DEEPSEEK_API_KEY",
      "base_url": "https://api.deepseek.com/v1",
      "default_model": "deepseek-chat"
    }
  }
}
```

```py
import json
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

from openai import OpenAI


@dataclass(frozen=True)
class ProviderConfig:
    api_key: str
    base_url: str
    default_model: Optional[str] = None


def _read_json(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        raise RuntimeError(f"Failed to read config json: {path}") from e


def _env(name: str) -> Optional[str]:
    v = os.environ.get(name)
    return v if v and v.strip() else None


def load_providers(config_path: Optional[str] = None) -> Dict[str, ProviderConfig]:
    """
    Config priority:
      1) Environment variables (API key always can be provided by env)
      2) llm_config.json (same folder as this file, or config_path)
    """
    default_path = Path(__file__).with_name("llm_config.json")
    path = Path(config_path) if config_path else default_path
    raw = _read_json(path)
    raw_providers: Dict[str, Any] = (raw.get("providers") or {}) if isinstance(raw, dict) else {}

    providers: Dict[str, ProviderConfig] = {}
    for name, entry in raw_providers.items():
        if not isinstance(entry, dict):
            continue
        api_key_env = str(entry.get("api_key_env") or "").strip()
        # 如果没有显式配置 api_key_env，就默认用 NAME_API_KEY 这种命名
        fallback_env = f"{name.upper()}_API_KEY"
        env_name = api_key_env or fallback_env
        api_key = (_env(env_name) if env_name else None) or str(entry.get("api_key") or "").strip()
        base_url = str(entry.get("base_url") or "").strip()
        default_model = str(entry.get("default_model") or "").strip() or None
        if base_url:
            providers[name] = ProviderConfig(api_key=api_key, base_url=base_url, default_model=default_model)

    return providers


def create_client(provider: str, *, config_path: Optional[str] = None) -> Tuple[OpenAI, ProviderConfig]:
    providers = load_providers(config_path=config_path)
    if provider not in providers:
        known = ", ".join(sorted(providers.keys()))
        raise KeyError(f"Unknown provider '{provider}'. Known providers: {known}")
    cfg = providers[provider]
    if not cfg.api_key:
        raise RuntimeError(
            f"Missing api_key for provider '{provider}'. "
            f"Set env var '{provider.upper()}_API_KEY' (or configure api_key_env/api_key in llm_config.json)."
        )
    return OpenAI(api_key=cfg.api_key, base_url=cfg.base_url), cfg
```

```py
import os
from llm_config import create_client
def main():
  provider = "deepseek"
  client, cfg = create_client(provider)
  model = cfg.default_model
  messages = [
    {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},
    {"role": "user", "content": "你好，我叫李雷，1+1等于多少？"}
  ]
  # 第一轮问答
  completion = client.chat.completions.create(
      model = model,
      messages = messages,
      temperature = 0.6,
  )
  messages.append(completion.choices[0].message)
  print(completion.choices[0].message.content)

  # 第二轮问答
  messages.append({
    "role": "user",
    "content": "你好，我叫韩梅梅，2+2等于多少？"
  })
  completion = client.chat.completions.create(
    model = model,
    messages = messages,
    temperature = 0.6,
  )
  messages.append(completion.choices[0].message)
  print(completion.choices[0].message.content)
if __name__ == "__main__":
  main()

```
