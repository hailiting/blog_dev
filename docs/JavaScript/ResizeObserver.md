# ResizeObserver
``ResizeObserver``可监听Element的内容区域或``SVGElement``的边界框改变，内容边距需要减去内边距padding值。
~~~
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        console.log(entry.contentRect.width)
        entry.target.style.borderRadius = Math.max(0, 1000 - entry.contentRect.width) + "px"
      }
    })
    resizeObserver.observe(document.querySelector('.box'))
~~~
## 常用api
- ResizeObserver.disconnect()
  取消和结束目标对象上所有对``Element``或``SVGElement``的观察
- ResizeObserver.observe()
  开始观察指定的``Element``或``SVGElement``
- ResizeObserver.unobserve()
  结束观察指定的``Element``或``SVGElement``