# img

- `fetchPriority`: 告诉浏览器优先下载和渲染这张图片，提高页面加载速度
  - high, low, auto
- `decoding`: 指示浏览器异步解码图像，不会阻塞页面渲染
  - sync: 告诉浏览器同步解码图像,可能会阻塞页面渲染。
  - async: 告诉浏览器异步解码图像,不会阻塞页面渲染。
  - auto: 让浏览器自行决定解码策略,这是默认值。
- `srcset`: 这个属性提供了一组不同分辨率的图像源，让浏览器可以根据设备
- `loading`: 图像的加载策略
  - `lazy` 延迟加载
  - `eager` 立即加载
  - `auto` 由浏览器决定
- `importance`: 指图像的相对重要性
  - high, low, auto
- `crossorigin`: 指定图像的跨域访问策略
  - anonymous
  - `use-credentials`
- `intrinsicsize`: 指定图像的固有尺寸,可以避免由于图像尺寸的变化而导致的页面重排
