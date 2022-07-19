import { ContinuousChar02, str } from "./continuous-chart";

describe("获取字符串中连续最多的字符以及次数 - 使用嵌套循环", () => {
  it("正常情况", () => {
    const res = ContinuousChar02(str);
    expect(res).toEqual({ char: "e", length: 4 });
  });
  it("空字符串", () => {
    const res = ContinuousChar02("");
    expect(res).toEqual({ char: null, length: 0 });
  });
  it("无连续字符串", () => {
    const res = ContinuousChar02("abc");
    expect(res).toEqual({ char: "a", length: 1 });
  });
  it("全部都是连续字符串", () => {
    const res = ContinuousChar02("aaaaaaaaaaa");
    expect(res).toEqual({ char: "a", length: "aaaaaaaaaaa".length });
  });
});
