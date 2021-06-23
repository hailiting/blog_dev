import React from "react";
import { storiesOf } from "@storybook/react";

import Progress from "./progress";

const defaultProgress = () => <Progress percent={40} />;

storiesOf("percent 组件", module).add("Progress", defaultProgress);
