# nextjs13+ 特性

- 13+ 之后的 app dir
- 没有`"use client"` 就是 server component

```
/src/
  /app/
    /api/
    /dashboard/
      /[app]/
        - layout.tsx
        - page.tsx   ------ /dashboard/:app
      - layout.tsx
      - page.tsx   /dashboard
    /@team/   生成一个插槽  Parallel Routes
      /page.js
    /@analytics/
      /page.js
    /(..)photo/   Intercepting Routes
      /[id]     动态的
        /page.js
    /photo/
      /[id]
        /page.js
    - layout.tsx   根目录  html/head/etc
      export default function layout(({children,team, analytics}) {
        return <>{children}{team}{analytics}</>
      })
    - page.tsx   /  路由
```

- SSR 服务端渲染
  - hydrate on client
    - Response Html
    - Component js
- RSC react server component -> component 只会运行在服务端
  - Response Html
    - 请求数据库啥的

## server action

- 函数运行在服务端，客户端代码可以在调用服务端函数
  - 不需要 api

## Router

- Parallel Routes
  - 导航 页面主体
- Intercepting Routes
  - 当前页面打开路由不会调离
- Api route handler
- Loading UI

## Data Fetching

```tsx
export default function Page() {
  const handleSubmit = async (form: FormData) => {
    // 不会渲染到client里，不需要定义api路由
    "use server";
    // ...
    console.log("-------->", form.get("name"));
  };
  return (
    <form action={handleSubmit}>
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```
