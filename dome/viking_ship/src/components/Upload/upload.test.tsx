import "@testing-library/jest-dom/extend-expect";
import React, { MouseEvent } from "react";
import axios from "axios";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  createEvent,
} from "@testing-library/react";
import { Upload, UploadProps } from "./upload";
// jest mock https://jestjs.io/docs/en/mock-functions#mocking-modules
interface IconProps {
  icon: string;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}
jest.mock("../Icon/icon", () => {
  // mock icon组件
  return ({ icon, onClick }: IconProps) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
jest.mock("axios"); // mock axios 的实现
const mockedAxios = axios as jest.Mocked<typeof axios>;
const testProps: UploadProps = {
  action: "fakeUrl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
/**
 * 测试是模拟一个假的运行流程
 */
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
// wrapper dom结构 Render结构
// uploadArea 点击触发上传的区域
const testFile = new File(["xyz"], "test.png", { type: "image/png" });
describe("测试upload组件", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}> Click me</Upload>);
    fileInput = wrapper.container.querySelector(
      ".viking-file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("Click me") as HTMLElement;
  });
  it("基础测试", async () => {
    const { queryByText } = wrapper;
    mockedAxios.post.mockResolvedValue({ data: "cool" }); // 模拟请求结果
    expect(uploadArea).toBeInTheDocument(); // uploadArea在文档里
    expect(fileInput).not.toBeVisible(); // fileInput不可见
    fireEvent.change(fileInput, { target: { files: [testFile] } }); // 点击fileInput，传递参数是 testFile的模拟文件
    expect(queryByText("spinner")).toBeInTheDocument(); // spinner 的text在文档里
    await wait(() => {
      // 异步调用
      expect(queryByText("test.png")).toBeInTheDocument(); // test.png 的text在文档里
    });
    expect(queryByText("check-circle")).toBeInTheDocument(); // check-circle 【删除】 的text在文档里
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile); // 模拟 onSuccess 回调
    expect(testProps.onChange).toHaveBeenCalledWith(testFile); // 模拟 onChange 回调

    // remove测试
    expect(queryByText("times")).toBeInTheDocument(); // times remove按钮的的class
    const times = queryByText("times") as HTMLElement;
    fireEvent.click(times);
    expect(queryByText("test.png")).not.toBeInTheDocument();
    // expect(queryByText("onRemove")).toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });
  it("drag 文件测试", async () => {
    fireEvent.dragOver(uploadArea); // 拖拽 over 的时候
    expect(uploadArea).toHaveClass("is-dragover"); // uploadArea添加 is-dragger class类名
    fireEvent.dragLeave(uploadArea); // 拖拽 lever的时候
    expect(uploadArea).not.toHaveClass("is-dragover"); // uploadAream没有 is-dragger class类名
    const mockDropEvent = createEvent.drop(uploadArea); // 拖拽事件
    // 扩展mockDropEvent对象，使对象支持dataTransfer
    // e.dataTransfer.files 这个属性就存在了
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);
    await wait(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });
});
