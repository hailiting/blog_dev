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



尺寸：970cm*220cm 使用场景：蓝图工场・ AI-native加速器的入户形象 风格：采用模块化几何设计，突出未来科技感，色彩可以丰富些。抽象二元平衡曲线（借鉴太极阴阳图元素，不能有具体的太极图案），线条要简练。 要表达的意境：整体世界由物理世界与数字世界平衡共生形成。左侧代表物理世界，左侧正中间是代表了公司体系/资源聚合（包含众仓科技、融加企管/Finplus.glob、华业国际/huaye.org、学神科技/migicsoft.com、顺链科技/slconsole.com）的大图，左侧散落宇宙里的星球展现可以用抽象边框替代，边框内放置项目logo，暂定放入的代表项目数量10~20个。太极图交感的两个位置,左侧放置slconsole的logo，图标下面显示名称;右侧放置云仓的icon，图标下面显示名称。右侧代表数字世界，右侧正中间的大图代表了Second Life(开放游戏世界)，大图要体现1.所有知名区块链logo，2.跨链桥，3，世界地图4.agent，5.对接预言机；周围散落宇宙里的星球展现可以用抽象边框替代，边框内放置项目logo，暂定放入的代表项目数量10~20个。风格：简洁，浅色背景（如极浅灰、米白、冷灰白，整体高明度）  提示词

Ultra-wide entrance mural for an AI-native accelerator hub, 970cm by 220cm layout feel, modular geometric design, futuristic tech, clean minimalist composition, soft light high-key background: pale cool grey, off-white, or warm ivory, airy and bright, NOT a dark canvas, NOT night sky, rich but controlled accent colors (electric blue, cyan, magenta, subtle gold) only on key modules, abstract dual-world balance: a single sleek flowing S-curve as the only dividing gesture between two halves, inspired by cosmic balance and duality but NOT a yin-yang or taiji symbol, crisp flat vector illustration, high contrast between modules and background, thin precise lines, no ornamental clutter,

LEFT HALF — physical world: darker modular geometric masses (charcoal, deep navy) as shapes only, floating on the light background, center features one large aggregated “corporate ecosystem” hub: interlocking blocks, supply-chain nodes, abstract monogram placeholders suggesting enterprise groups (no readable real trademarks), around it 10–20 small floating abstract frames (hexagons, rounded squares, star-like badges) each containing a simple generic placeholder icon for a partner project logo,

RIGHT HALF — digital world: bright light ground with vivid digital accents on modules, center features one large “open metaverse / second life” style network map: abstract famous blockchain glyph placeholders as simple geometric marks, cross-chain bridge motifs as linked arcs, faint world map wireframe, tiny autonomous agent silhouettes, oracle connection rays to outer nodes, all stylized and non-literal, around it 10–20 small floating abstract frames with generic placeholder project marks,

TWO CRITICAL FOCAL NODES on the balance curve: (1) on the physical side, a clean white rounded badge area with a minimal fictive “SLConsole” wordmark and tiny subtitle space below, (2) on the digital side, a clean black rounded badge area with a minimal fictive “Cloud Warehouse” pictogram and subtitle space below, both readable as logo slots, not photoreal,

Style: editorial tech poster, Swiss layout, generous whitespace, cosmic harmony, future industry + open digital universe coexisting, --ar 97:22 --s 280 --v 6.2 --no taiji, yin-yang symbol, bagua, black background, night sky, heavy vignette




生成一个主视觉的KV。中心由一个丝带状形状组成的时尚抽象设计，丝带的两端从左上和右下汇入中心，整体呈现“S”形。色带以凉爽，柔和的色调渐变，主要是蓝色，紫色，白色，产生一种科技和活力的感觉。丝带捕捉并反射光，使它们具有光泽，柔软的外观。丝带局部显示出彩虹般的光折射，产生棱镜效果。背景是高级的浅紫灰色，增强了对比度，使立方体更加突出。该图像具有现代，未来派的美感，让人联想到数字艺术和CGI。营造出深度感和现实感。整体风格干净而精确，专注于几何形状和光线相互作用。视角从底部大仰视，艺术品可能是使用先进的数字软件创建的，具有很高的精度和对细节的关注。

A stunning main visual KV, epic low-angle view from below. A single, sleek, flowing ribbon forms a dynamic 3D S-curve shape, converging from the top-left and bottom-right into the center. The ribbon has a glossy, soft appearance that captures and reflects light, with localized rainbow light refraction creating a prism effect. Cool, gentle gradient in shades of blue, lavender, and white. Advanced shallow violet-grey background enhances contrast and depth. Modern, futuristic digital art style, evoking CGI and 3D rendering, with a sense of luxury technology and vibrant energy. Clean, precise, and geometric, focusing on the interaction of light and form. --ar 3:2 --style raw --v 6.2
