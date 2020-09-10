import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import Button, { ButtonType, ButtonSize, ButtonProps } from "./button";
const setButton = (arg: ButtonProps) => <Button {...arg} />;
storiesOf("Button Component", module)
  .addParameters({ jest: ["button.test.tsx"] })

  // 当name和组件名字一样的时候才会出现markdown文档
  .add("Button", () => {
    return setButton({
      children: text("Children", "mybtn").toString(),
      className: text("ClassName", "mybtn").toString(),
      disabled: boolean("Disabled", false),
      size: text("size", "lg") as ButtonSize,
      btnType: text("btnType", "danger") as ButtonType,
      hrefbtntype: text("HrefbtnType", "mybtn").toString(),
      onClick: action("12323"),
    });
  });
