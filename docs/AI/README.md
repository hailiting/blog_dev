# 人工智能 AI

## 历史

- 2017: Transformer 被提出，取代了循环神经网络（RNN）,LLM核心基础
- 2018-2020: 预训练模型兴起，BERT和GPT-1分别发布
  - BERT 通过双向上下文建模，在自然语言理解任务中取得了显著的性能提升
  - GPT-1 展示了强大的文本生成能力，开启了AI在语言领域广泛的应用
- 2022: ChatGPT 生成式AI
- 2023~ 多元华与应用拓展期
  - 多模态模型的崛起：如 GPT-4V、Gemini Pro

## LLM 核心概念: Token、参数 【Large Language Model】

- LLM 大语言模型
  - 通过海量训练数据与参数规模而产生最先进的通用性人工智能模型
  - 基于Transformer的自回归语言模型（如GPT系列）
    - Generative Pre-trained Transformer 生成式 预训练 注意力
  - 通过海量无标注文本，自主学习下一个词的概率分布
- 大语言模型的能力来源
  - 输入 Tokens -> LLM -> 输出 Tokens
- Tokens 词元
  - 模型处理文本的最小单元
  - 主流的LLM的Tokens数在万亿级别 LLM token rank
    - 大语言模型排行榜：`https://artificialanalysis.ai/leaderboards/models`
- 参数
  - 模型内部的可学习变量
  - 决定了模型如何处理数据
  - 通过优化算法自动调整
  - 从数据(Token)中学习规律
  - 参数规模约亿~万亿级别
- Prompt 提示词
  - 如何写好
    - 清晰具体：避免模糊表述，明确需求
    - 提供上下文：帮助AI更精准理解意图
    - 分布拆解 Chain-of-Thought Prompting：提出问题，在问题后【加分布拆解】
    - 调整语气和风格
    - 实验优化：根据输出结果调整Prompt
