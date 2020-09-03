import React, { useState } from 'react';
// import Hello from "./components/Hello"
import LikeButtom from "./components/LikeButton"
// import useMousePosition from "./hooks/useMousePosition"
import MouseTracker from "./components/MouseTracker"
// import WithLoader from "./components/WithLoader";
import useURLLoader from "./hooks/useURLLoader"
import './App.css';


interface IShowResult {
  message: string;
  status: string;
}

// type IUDogShow = (data: IShowResult) => JSX.Element;
// const DogShow: IUDogShow = (data) => {
//   return (
//     <>
//       <h2>Dog show: {data.status}</h2>
//       <img src={data.message} alt="" />
//     </>
//   )
// }




const App: React.FC = () => {
  const [show, setShow] = useState(true);
  // const positions = useMousePosition();
  const [data, loading] = useURLLoader("https://dog.ceo/api/breeds/image/random", show);
  const dogResult = data as IShowResult;
  console.log(dogResult)
  return (
    <div className="App">
      <LikeButtom />
      {/* {loading ? <p>loading</p> : <img src={dogResult.message} alt={dogResult.status} />} */}
      {loading ? <p>loading</p> : dogResult ? <img src={dogResult.message} alt={dogResult.status} /> : null}
      {/* <p>{positions.x} {" "} {positions.y}</p> */}
      <p><button onClick={() => setShow(!show)}>设置show为 {!show + ""}</button></p>
      {show && <MouseTracker />}
    </div>
  );
}

export default App;
