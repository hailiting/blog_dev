import "./App.css";
import routes from "./routes";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="./componentdemo">普通组件</Link>
        </li>
        <li>
          <Link to="./puredemo">纯组件</Link>
        </li>
        <li>
          <Link to="./functionaldemo">纯函数组件</Link>
        </li>
        <li>
          <Link to="./hocdemo">高阶组件</Link>
        </li>
        <li>
          <Link to="./portalsdemo">组件插槽</Link>
        </li>
        <li>
          <Link to="./suspensedemo">Suspense组件</Link>
        </li>
        <li>
          <Link to="./memodemo">Memo组件</Link>
        </li>
        <li>
          <Link to="./contextdemo">context组件</Link>
        </li>
        <li>
          <Link to="./refdemo">Ref组件</Link>
        </li>
        <li>
          <Link to="./errdemo">Error 组件</Link>
        </li>
        <li>
          <Link to="./lifecycledemo">生命周期</Link>
        </li>
        <li>
          <Link to="./hookdemo">React Hooks</Link>
        </li>
        <li>
          <Link to="./fiberdemo">React Fiber</Link>
        </li>
      </ul>
      <div>{routes}</div>
    </div>
  );
}

export default App;
