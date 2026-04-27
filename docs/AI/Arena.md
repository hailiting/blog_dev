# LMArena 改名 Arena

- Language Model Arena
  - `https://arena.ai/leaderboard/`
- 方向
  - Text 纯文本理解和生成能力
  - Code 编程能力
  - Vision 图像理解能力（多模态）
  - Document
  - Text-to-Image 文本生成图像能力
  - Image Edit 图像编辑能力
  - Search
  - Text-to-Video
  - Image-to-Video

小明比小红大三岁、三年前小明是小红年龄的两倍。请问小明现在几岁?顺使问一句:你解题的时候有没有头晕?

```

```

```sh
curl https://api.moonshot.cn/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer sk-kimi-hHi4FsL8p2KjqOryIChPUP9auB0h3TmIUjLkZLnAiGwku9n6vyD6DzfAgMUxNvdU" \
    -d '{
        "model": "kimi-k2.5",
        "messages": [
            {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},
            {"role": "user", "content": "你好，我叫李雷，1+1等于多少？"}
        ],
        "temperature": 0.6
   }'
```
