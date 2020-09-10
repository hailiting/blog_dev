import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import React from "react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";
import "../src/styles/index.scss";
library.add(fas);
const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
};

const storyWrapper = (stroyFn) => <div style={wrapperStyle}>{stroyFn()}</div>;
addDecorator(storyWrapper);
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
    iframeHeight: 1000,
  },
});
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(
  withTests({
    results,
  })
);
addDecorator(withInfo);
addParameters({ info: { inline: true, header: false } });

const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.tsx")];
  const req = require.context("../src/components", true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname))); // 把其他的都加到allExports
  return allExports;
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
