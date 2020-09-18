# 前端性能优化\_link 篇.md

## link 标签`rel="alternate"`属性的作用及用法

1. 可用于将 PC 版页面指向移动版页面，将移动版页面指向 PC 版页面，这样有利于搜索引擎，对不同设备提供不同类型的页面

```html
<link
  rel="alternate"
  media="only screen and (max-width:640px)"
  href="http://m.mbile.com"
/>
```

移动版页面应添加

```html
<link rel="canonical" href="https://www.pc.com" />
```

2. 用于不同 css 样式表之间切换控制效果

```html
<link href="default.css" rel="stylesheet" type="text/css" title="default" />
<link href="red.css" rel="stylesheet" type="text/css" title="red" />
<link href="green.css" rel="stylesheet" type="text/css" title="green" />
```

`rel=alternate`页面默认不会渲染，可以作为后备样式，对 link 使用 disabled 即可进行切换，无延迟。但会提前下载，浪费宽带，可以在必须的场景下使用。

## Pre

### 什么是 Pre 技术

- 预加载技术，指在不影响当前页面情况下，浏览器预加载资源的性能优化方案

#### `dns-prefetch`

这个是用的最广泛的，用于告知浏览器预先获取指定域名的 DNS，以便在使用时减少对 DNS 查找的时间。

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="//dnsXXX.com" />
```

#### `preconnect`

预连接，和`dns-prefetch`相似，但更进一步，不仅要求解析指定域名的 DNS，还需要预先与服务器握手及 TLS 协商【如果使用 HTTPS 的话】

```html
<link rel="preconnect" href="//xxx.com" crossorigin="anonymous" />
```

因为会与服务器握手，因此要确定"是否跨域"，带`crossorigin`属性，以告知浏览器如何处理跨域及 cookie。

#### `prefetch`

与`preconnect`有同样的参数【rel, href, crossorign】，自己本身还有 as，用于告知浏览器资源类型，这个类型和 MIME 不一样，是统称，如： `as="image"`, `as="script"`, `as="html"`等。

```html
<link rel="prefetch" href="xxx.como/xx.js" crossorgin as="script" />
```

使用 prefetch，整个资源会被加载，却不会被浏览器预处理或执行，资源只是被提前加载，并缓存起来，以便将来使用。

#### `prerender`

下载的是 HTML，与 prefetch 相同的是告诉浏览器下载整个资源，不同的是，prerender 会告诉浏览器，下载资源(HTML)并解析、执行它，包括被解析资源的子资源，这意味着会下载该 HTML 中的图片，样式，脚本等等，prerender 没有 as 属性，只是 HTML

```html
<link rel="preconnect" href="xxx.com" />
```

预渲染的条件是不容许对当前页面造成影响，浏览器会把预渲染的页面 visibilityState 属性为 hidden。
因为是预渲染，并不是真正的展示页面，所以消耗了不必要的资源，而且 chrome58 把这个功能去了。

#### `proload`

prefetch 与 preload 不同之处：

- 1. prefetch 的优先级很低，低到浏览器可以不加载
- 2. prefetch 的优先级很高，浏览器一定要加载
- 3. prefetch 加载的资源用于`将来`的某个页面，这意味着它可能不会被用到
- 4. Preload 加载的资源用于`当前`页面

```html
<link rel="preload" href="xxx.com" crossorigin as="image" />
```

### 总结

Pre 技术，除了`preload`，其他 Pre 都可能不被浏览器执行，这不是兼容性问题，而是 Pre 本身就不是浏览器必须的行为，浏览器会根据一定的策略来决定是否 Pre 相应的资源或操作，比如：CPU, 内存等的占优率。
