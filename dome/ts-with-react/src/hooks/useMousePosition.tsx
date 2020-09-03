import { useState, useEffect } from "react";
// 自定义hook一定以 use 开头
const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPositions({
        x: e.clientX,
        y: e.clientY,
      })
    }
    document.addEventListener("mousemove", updateMouse)
    // 清除点击事件
    return () => {
      document.removeEventListener("mousemove", updateMouse)
    }
  }, [])

  return positions
}
export default useMousePosition;