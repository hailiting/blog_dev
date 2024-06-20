# midjourney

## 低价

- https://nf.video

## 常用指令

- `/imagine`: 最基本的绘画指令，输入关键词即可生成 AI 绘画
  - 图片参考图的话，先发图 在复制了解
  - Vxx 改
  - Uxx 放大
  - Zoom out 在原来的基础上放大
  - `--zoom` 自定义倍数
  - 关键描述词：主题 环境 改图&风格
    - 主题：人物、地点、干什么、外貌、特征描述
    - 环境：氛围、灯光、细节
  - comic style 漫画风
  - Cyberpunk
- `/help`: 获取机器人推送的指南及基本帮助信息
- `/subscribe`: 进入订阅频道
- `/fast`: 切换到快速出图模式
- `/relax`: 切换到一般出图模式
- `/private`: 激活私有模式，使作品对其他用户不可见
- `/show`: 输入 Job_ID，重现该画作，只限输入自己的创作
- `/settings`: 选择模型种类，质量细节，渲染速度以及打开混合模式功能等操作

  - `--niji ` stylize 数值越高，创意发挥的空间越大
  - `Remix mode`: 可以选择图片进行变体
  - `High Variation Mode`: 生成的图片风格变化大不大

- 添加 `--chaos 100`: 0-100， 数值越大，变化越多。生成风格差异很大的图
- 两个词之间添加"::"，整体单词的意义会被更多的分开考虑
- 负面参数`--no+内容`: 没有指定的元素内容
- 固定设置
  - `/prefer auto_dm` 直接把 seed JobID 发显示出来
  - `/prefer suffix`
  - `--ar 16:9` 宽高比 16:9
- `--seed 编号`: 保持整体风格相似，生成新的一组图片
- `iw`: 调整生成图片与参考图之间的相似度 范围在`0.5-2`, 数值越大越接近原图的样子
- `/describe` + 上传一张图: 得到四条关键词咒语
- `/blend` 融合图片
- `/show job_id` 修改特定图片
- `/describe` 关键词
- `/shorten` 精练关键词

## 后缀参数

- `--ar` 比例
- `--c` 多样性设置 0-100 默认值 0
- `--s` 控制每张图片自身的风格效果 0-1000
- `--q` 渲染质量设置 0.25 0.5 1
- `--stop` 渲染停止设置 画面渲染到 xx 停止
- `--iw` 上传图片的权重设置 0-2 2 的时候可以自由发挥
- `--seed` 种子值 四宫格 seed 值
- `--no` 不要啥元素
- `--tile` 无缝拼接图案
- `--r` 重复生出 1-40
- `--niji` 版本切换
- `--video` 记录生成视频

## 参考图网站

- 综合性强；参考图质量高： https://prompthero.com/
- 可上传图片查找对应风格的内容，以图搜图： https://lexica.art/
- 各种流派、插画家、风格一目了然： https://www.midlibrary.io/
- 可下载提示词说明书： https://openart.ai/
- 二次元相关提示词整合网站： https://aiguidebook.top/

战士 男 红发 大锤 金属铠甲
刺客 男 黑发 双剑 有一侧护肩
巫师 男 蓝发 法杖 头环

先知 女 白发 十字法杖
游侠 女 金发 弓箭

## 实例

white background,
set up vector graphic character from all sides,
different emotions

### 赛博+日漫

anime, futuristic cyberpunk,

1.  Job ID: 6bec9737-6ad8-4a59-8fa8-e770cbff6ff7
    seed 2619818670

warrior,male, red hair, a large hammer, in metal armor,

2.  Assassin, male, black hair, double swords, one shoulder guard,

3.

Job ID: bf803612-1a80-4b03-abff-97691aa588f7
seed 1029609927

Prophet, Female, White Hair, Cross Staff,
anime, futuristic cyberpunk,
white background,
set up vector graphic character from all sides,
different emotions

### Q 版

1. Job ID: 3d8a34b8-9274-41a5-8a70-6e570ff5ab10
   seed 2728571679

warrior,male, red hair, a large hammer, in metal armor,
Chibi style,
white background,
set up vector graphic character from all sides,
different emotions

4. Job ID: 727e4a37-7195-4d56-8655-6a01bf30e080
   seed 2450870635

### 像素

Pixel art de um personagem de videogame de 8 bits,
white background --v 5

##

AI
https://dco-generator.vercel.app
