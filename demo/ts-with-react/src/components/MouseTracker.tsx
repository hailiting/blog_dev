import React from "react";
import useMousePosition from "../hooks/useMousePosition"
const MouseTracker: React.FC = () => {
  const positions = useMousePosition()
  return (
    <p>X: {positions.x}, Y: {positions.y}</p>
  )
}
export default MouseTracker;