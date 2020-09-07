import React, { useState } from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Transition from "./components/Transition/transition";
interface IThemeProps {
  [key: string]: { color: string; background: string };
}

const themes: IThemeProps = {
  light: {
    color: "#000",
    background: "#fff",
  },
  dark: {
    color: "#fff",
    background: "#222",
  },
};
export const ThemeContext = React.createContext(themes.light);
/**
 * ThemeContext [go to type Defination] interface Context<T> {
        Provider: Provider<T>;
        Consumer: Consumer<T>;
        displayName?: string;
    }
 */
type IMenuMode = "vertical";
const App: React.FC = () => {
  const testProps = {
    defaultIndex: "0",
    onSelect: (index: string) => {
      console.log(index);
    },
    className: "test",
    // mode: "vertical" as IMenuMode, // ... 会转义
    // defaultOpenSubMenus: ["3"],
  };
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        btnType="danger"
        onClick={() => {
          setShow(!show);
        }}
      />
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-left"
        wrapper={true}
      >
        <ThemeContext.Provider value={themes.light}>
          <Menu {...testProps}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xyz</MenuItem>
            <SubMenu title="dropdown">
              <MenuItem>drop1</MenuItem>
            </SubMenu>
          </Menu>
          <Button />
          <Button btnType="danger" />
          <Button disabled={true} />
          <Button disabled={false} />
          <Button btnType="link" />
          <Button className="myclass" />
          <Button size="lg" />
          <Button size="sm" />
        </ThemeContext.Provider>
      </Transition>
    </>
  );
};
export default App;
