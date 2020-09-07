import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../App";
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(false);
  const domRef = useRef<HTMLButtonElement>(null);
  const theme = useContext(ThemeContext);
  const style = {
    background: theme.background,
    color: theme.color,
  };
  useEffect(() => {
    console.log(like);
  }, [like]);
  useEffect(() => {
    if (domRef && domRef.current) {
      console.log(domRef.current);
      domRef.current.onclick = () => {
        console.log("charge you");
      };
    }
  });
  return (
    <>
      <button
        ref={domRef}
        onClick={() => {
          setLike(like + 1);
        }}
        style={style}
      >
        {like} o(￣▽￣)ｄ
      </button>
      <br />
      <button
        onClick={() => {
          setOn(!on);
        }}
      >
        {on + ""}
        <span role="img" aria-labelledby="panda1">
          🏃
        </span>
      </button>
    </>
  );
};
export default LikeButton;
