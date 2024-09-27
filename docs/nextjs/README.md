# Nextjs

@web3modal/wagmi @web3modal/siwe next 14 next-auth lang:json
https://github.com/search?q=%40web3modal%2Fwagmi+%40web3modal%2Fsiwe+next+14+next-auth+lang%3Ajson&type=code&p=1
```bash
npx create-next-app@latest my-next-app
```

## docker 配置

![post-docker](./img/post-docker.jpg)

## 可视化工具

Beekeeper-Studio

## ORM Object-Relational Mapping 对象关系映射

一种编程技术，主要用于在面向对象编程语言和关系型数据库管理系统之间建立桥梁

- prisma
- Drizzle

### Drizzle

orm.drizzle.team/docs/

#### 创建

```bash
yarn add drizzle-orm postgres
yarn add drizzle-kit -d
```

```ts
// src/server/db/schema.ts
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
export const Users = pgTable("users", {
  id: serial("user_id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});
```

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "123456",
    database: "postgres",
  },
  verbose: true,
  strict: true,
});
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    ...
  }
}
```

```bash
# 插入数据库
npx drizzle-kit push
# 启动图形工具
npx drizzle-kit studio
```

#### 使用

PostgreSQL

```bash
npm i drizzle-orm postgres
npm i -D drizzle-kit
```

```ts
// src/server/db/db.ts
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as schema from "./schema";

// for migrations
// const migrationClient = postgres("postgres://postgres:123456@localhost:5433/postgres", );
// migrate(drizzle(migrationClient), ...)
// for query purposes
const queryClient = postgres(
  "postgres://postgres:123456@localhost:5433/postgres"
);
export const db = drizzle(queryClient, { schema });
```

```tsx
import { Button } from "@/components/ui/button";
import { db } from "@/server/db/db";
import { Users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
export default async function Home() {
  // const users = await db.query.Users.findMany();
  const users = await db.select().from(Users);
  // .where(eq(Users.name, "aaa")); // 类 SQL 语法
  return (
    <main>
      {users.map((v) => (
        <div key={v.id}>
          <h1>{v.name}</h1>
        </div>
      ))}
    </main>
  );
}
```

## Serverless 和 RPC

- Serverless 无服务
  - 后端服务由第三方管理，无需开发者直接管理服务器
- RPC (Remote Procedure Call) 远程调用
  - 用于分布式系统中进行通信的协议，在 Serverless 架构中可以作为服务调用的底部实践

## NextAuth.js 权限控制

```bash
yarn add next-auth
```

```ts
// app/api/auth/[...nextauth]/route.ts   Dynamic Route Segments
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

```ts
// server/auth/index.ts
```

```tsx
import { redirect } from "next/navigation";
...
const session = await getServerSession();
if (!session?.user) {
  redirect("/");
}
...
```

中间件 middleware

```ts
// middleware.tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "./server/auth";
export async function middleware(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/dashboard/:path*",
};
```

## Api Route

### Route Handle

```tsx
// 多重 /src/api/test/[...id]/route.ts
```

### Route 的一些配置项

```tsx
// cache 页面是否动态生成  auto
export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
```

- dynamic 页面是否动态生成
  - auto 自动
  - `force-dynamic` 强制动态渲染
- dynamicParams 是否接受动态路由参数
  - true 时，nextjs 会认为页面可能需要再运行时动态生成
- revalidate: 页面的缓存策略
  - false 不进行缓存失效，一直缓存到手动更新
  - number 秒
  - invalidated 使用缓存一直到明确收到无效信号
- fetchCache 控制页面 HTTP 请求如何被缓存
  - auto 根据请求类型自动选择缓存策略
  - `force-no-store` 强制不缓存任何 HTTP 请求
  - `only-if-cached` 只有在缓存中找到响应时才返回结果，否则返回网络错误
  - `default-cache` 使用 nextjs 缓存侧率
- runtime: 运行缓存
  - nodejs 目前只支持 nodejs
- preferredRegion 页面在边缘网络中优先部署地区

## 读 cookies

```tsx
console.log(cookies().get("a"));
```

## API 安全校验

### Zod

```ts
// src/app/api/test/route.ts
import z from "zod";
const inputSchema = z.object({
  name: z.string().max(10).min(3),
  email: z.string().email(),
});

const query = request.nextUrl.searchParams;
const name = query.get("name");
const email = query.get("email");

// 1 safeParse
const result = inputSchema.safeParse({
  name,
  email,
});
if (result.success) {
  return NextResponse.json(result);
} else {
  return NextResponse.json({
    error: err.message,
  });
}
// 2 parse
try {
  const result = inputSchema.parse({
    name,
    email,
  });
  return NextResponse.json(result);
} catch (err) {
  return NextResponse.json({
    error: err.message,
  });
}
```

#### `drizzle-zod`

```bash
yarn add drizzle-zod
```

```ts
// 维护对外的schema
// src/server/db/validate-schema.ts
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./schema";
export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
});
// 获取一部分
export const updateUserSchema = insertUserSchema.pick({
  email: true,
});
// 自动插入的 会是 nullable
export const queryUserSchema = createSelectSchema(users);

// 应用
// src/app/api/test/route.ts
const result = insertUserSchema.safeParse({
  name,
  email,
});
```

### TRPC

- RPC 跨端协议
- gRPC 微服务间的调用
- TRPC 基于 HTTP 协议

#### query mutation

- query get
- mutation post

```bash
yarn add @trpc/server
```

```ts
// src/utils/trpc.ts
import { initTRPC } from "@trpc/server";
export async function createTRPCContext() {
  const session = await getServerSession();
  if (!session?.user) {
    return;
  }
  return { session };
}
const t = initTRPC.create<typeof createTRPCContext>();
const { router, procedure } = t;
const middleware = t.middleware(async ({ ctx, next }) => {
  const start = Date.now();
  const result = await next();
  console.log("---Api time: ", Date.now() - start);
  return result;
});
const loggedProcedure = procedure.use(middleware);

const checkLoginMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "FORBIDDEN",
    });
  }
  return next();
});

export const testRouter = router({
  hello: loggedProcedure.query(async (ctx) => {
    console.log(ctx.session);
    return { hello: "world" };
  }),
});
// 节流
export const serverCaller = createCallerFactory()(testRouter);
```

```ts
// app/api/[...trpc]/route.ts
import { NextRequest } from "next/server";
const t = initTRPC.create();
const handler = (request: NexRequest)=>{
  return fetchRequestHandler({
    endpoint： "api",
    req: request,
    router: testRouter,
    createContext: createTRPCContext
  })
}
```

```tsx
// src/dashboard/page.tsx
export default async function Home() {
  const context = await createTRPCContext();
  // serverCaller 不需要 network  直接调用server
  const data = await serverCaller(context).hello();
  return <div>{data.hello}</div>;
}
```

#### TRPC 在 client 上的应用

```bash
yarn add --save @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query
```

```ts
// utils/api.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../server/router";
export const trpClientReact = createTRPCReact<AppRouter>({});
export const trpcClient = trpClientReact.createClient({
  links: [
    httpBatchLink({
      url: "xxx",
      async headers() {
        return {
          authorization: getAuthCookie(),
        };
      },
    }),
  ],
});
```

```tsx
// src/app/TRPCProvider.tsx
// TRPCProvider
import { trpClientReact } from "@/utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <trpClientReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpClientReact.Provider>
  );
}
```

```tsx
// src/app/layout.tsx
import { trpClientReact } from "@/utils/api";
export function RootLayout({ children }: { children: ReactNode }) {
  return <TRPCProvider>{children}</TRPCProvider>;
}
```

```tsx
export default function Home() {
  const { data, isLoading, isError } = trpClientReact.hello.useQuery({
    refetchOnWindowFocus: false,
  });
  return <div>{isError ? isError : isLoading ? loading : data}</div>;
}
```

## tailwindcss

使用 sm:, md:, lg:, xl: 和 2xl: 前缀来适应不同屏幕尺寸：

```tsx
<div class="px-4 sm:px-6 lg:px-8">
  <!-- Content here -->
</div>
```
