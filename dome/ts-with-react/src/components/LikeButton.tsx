import React, { useState, useEffect, useRef } from "react";
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(false);
  const domRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    console.log(like)
  }, [like])
  useEffect(() => {
    if (domRef && domRef.current) {
      console.log(domRef.current)
      domRef.current.onclick = () => {
        console.log("charge you")
      }
    }
  })
  return (
    <>
      <button ref={domRef} onClick={() => { setLike(like + 1) }}>{like} o(￣▽￣)ｄ</button>
      <br />
      <button onClick={() => { setOn(!on) }}>{on + ""}<span role="img" aria-labelledby="panda1">🏃</span></button>
    </>
  )
}
export default LikeButton;