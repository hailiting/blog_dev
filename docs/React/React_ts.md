# React_ts
## `create-react-app`
~~~shell
npx create-react-app ts-with-react  --typescript
~~~
## 新建一个Hello组件
~~~jsx
import React from "react";
interface IHelloProps {
  message?: string;
}
// FC=FunctionComponent
const Hello: React.FC<IHelloProps>=(props)=>{
  return <h2>{props.message}</h2>
}
Hello.defaultProps = {
  message: "Hello world!",
}
export default Hello;
~~~