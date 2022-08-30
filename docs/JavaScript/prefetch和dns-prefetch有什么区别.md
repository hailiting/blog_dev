# prefetch 和 dns-prefetch 有什么区别

- prefetch 资源在未来页面使用，空闲时加载
- preload 资源在当前页面使用，会优先加载

```html
<head>
  <!-- preload -->
  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />
  <!-- prefetch -->
  <link rel="prefetch" href="other.js" as="script" />

  <!-- 引用css -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <script href="main.css" defer></script>
</body>
```

## dns-prefetch 和 preconnet

- dns-prefetch 即 DNS 预查询
- preconnect 即 DNS 预连接

```html
<html>
  <head>
    <link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
  </head>
</html>
```
