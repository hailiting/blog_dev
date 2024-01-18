# 常用的 html 头部

meta 标签设置点击挟持防护

```html
<!-- 内容安全策略 CSP -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
<!-- 严格传输安全 -->
<meta
  http-equiv="Strict-Transport-Security"
  content="max-age=31536000; includeSubDomains"
/>
<!-- 防止浏览器对响应的MIME类型进行嗅探，减少可能的安全风险 -->
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<!-- 用于启用浏览器的跨站脚本攻击 XSS 过滤器，防止恶意脚本注入网页 -->
<meta http-equiv="X-XSS-Protection" content="1; mode=block" />
```
