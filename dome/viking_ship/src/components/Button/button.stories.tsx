import React from "react";
import { storiesOf } from "@storybook/react";

import Button from "./button";

const defaultButton = () => <Button />;

const buttonWithSize = () => (
  <div>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </div>
);
storiesOf("Button Component", module)
  .addParameters({ jest: ["button.test.tsx"] })
  .add("Button", defaultButton)
  .add("Button show", buttonWithSize);
