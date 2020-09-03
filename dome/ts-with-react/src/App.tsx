import React, { useState } from 'react';
// import Hello from "./components/Hello"
// import LikeButtom from "./components/LikeButton"
import useMousePosition from "./hooks/useMousePosition"
import MouseTracker from "./components/MouseTracker"
import './App.css';

const App: React.FC = () => {
  const [show, setShow] = useState(true);
  const positions = useMousePosition()
  return (
    <div className="App">
      <p>{positions.x} {" "} {positions.y}</p>
      <button onClick={() => setShow(!show)}>设置show为 {!show + ""}</button>
      {show && <MouseTracker />}
    </div>
  );
}

export default App;
