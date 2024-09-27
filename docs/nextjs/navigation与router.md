# navigation 与 router

- navigation nextjs 13+ 版本
- router nextjs 13- 版本

## router 常见用法: push replace back prefetch

### 页面跳转

```tsx
import { useRouter } from "next/router";
const router = useRouter();
function handleClick() {
  router.push("/another-page");
}
```

### 替换当前页

```tsx
router.replace("/another");
```

### 预加载：prefetch

```tsx
router.prefetch("/another");
```

## navigation

基于 React Server Components 和新的文件系统路由。

- API: useRouter, usePathname
- 自动代码分割

### 获取当前路径

```tsx
import { usePathname } from "next/navigation";
const pathname = usePathname();
```

### pathname, query, asPath:

- 当前页面的路径名
- query 一个对象，包含 URL 查询字符串参数
- asPath 当前页面的完整 URL，包括任何查询参数和片段标识符

```tsx
import { useRouter } from "next/navigation";

function PageInfo() {
  const router = useRouter();

  return (
    <div>
      Pathname: {router.pathname}
      <br />
      Query: {JSON.stringify(router.query)}
      <br />
      AsPath: {router.asPath}
    </div>
  );
}
```

### push(url[, options]) 和 replace(url[, options])

- push 导航到新的并添加历史记录条目
- replace 替换当前历史记录条目

```tsx
import { useRouter } from "next/navigation";
const router = useRouter();
function handleClick() {
  router.push("/another-page");
}
```

### prefetch 预加载 about 页面以便更快的切换

```tsx
useEffect(() => {
  router.prefetch("/about");
}, []);
```

### refresh

```tsx
router.refresh();
```

### back

和 `window.history.back()` 效果一样

```tsx
router.back();
```

### beforePopState

注册一个回调函数，当浏览器的前进/后退按钮被按下时触发。这可以让你在页面离开前执行一些清理工作。

```tsx
import { useRouter } from "next/navigation";

function LeavePrompt() {
  const router = useRouter();

  React.useEffect(() => {
    const handleBeforePopState = (e) => {
      if (!window.confirm("Are you sure you want to leave this page?")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    router.events.on("beforePopState", handleBeforePopState);
    return () => {
      router.events.off("beforePopState", handleBeforePopState);
    };
  }, []);

  return <div>Leave Prompt Page</div>;
}
```

### events

```tsx
import { useRouter } from "next/navigation";

function RouteChangeLogger() {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChangeStart = () => console.log("Route change start");
    const handleRouteChangeComplete = (url) =>
      console.log(`Route changed to ${url}`);
    const handleRouteChangeError = (error) =>
      console.error("Route change error:", error);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  return <div>Route Change Logger</div>;
}
```

### isFallback

一个布尔值，表示当前页面是否正在异步加载数据。在静态生成页面时特别有用。

```tsx
import { useRouter } from "next/navigation";

function LoadingPage() {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>Page Content</div>;
}
```

### isReady

```tsx
import { useRouter } from "next/navigation";

function ReadyCheck() {
  const router = useRouter();

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return <div>Page is ready</div>;
}
```

- locale 当前的本地化语言设置
- locales 应用程序支持的所有本地化语言设置
- defaultLocale 应用程序的默认本地化语言设置。

```tsx
import { useRouter } from "next/navigation";

function LocalizationInfo() {
  const router = useRouter();

  return (
    <div>
      Locale: {router.locale}
      <br />
      Locales: {JSON.stringify(router.locales)}
      <br />
      Default Locale: {router.defaultLocale}
    </div>
  );
}
```
