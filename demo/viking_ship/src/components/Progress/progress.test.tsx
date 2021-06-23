import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Progress, { ProgressProps } from "./progress";

const testProps: ProgressProps = {
  percent: 30,
  strokeHeight: 40,
  showText: true,
  theme: "secondary",
};
let wrapper: RenderResult;
describe("test Progress", () => {
  beforeEach(() => {
    wrapper = render(<Progress {...testProps} />);
  });
  it("test basic props", () => {
    const { queryByText } = wrapper;
    const innerText = wrapper.container.querySelector(
      ".inner-text"
    ) as HTMLSpanElement;
    expect(innerText).toBeInTheDocument();
    expect(queryByText("30%")).toBeInTheDocument();
  });
});
