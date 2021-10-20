import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
const ContextComp = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    method:method
  }))
 function method() {
    console.log("ref方法执行")
  }
  return <p onClick={()=>method()}>子组件</p>
})
export default function RefDemo() {
  const ref = useRef();
  useEffect(() => {
    ref.current.method();
  }, [])
  return (<><ContextComp ref={ref}/></>)
}