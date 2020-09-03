import React, { useState, useEffect } from "react";
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    console.log(like)
  })
  return (
    <>
      <button onClick={() => { setLike(like + 1) }}>{like} o(￣▽￣)ｄ</button>
      <br />
      <button onClick={() => { setOn(!on) }}>{on + ""}<span role="img" aria-labelledby="panda1">🏃</span></button>
    </>
  )
}
export default LikeButton;