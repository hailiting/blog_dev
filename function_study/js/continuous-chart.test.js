"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const continuous_chart_1 = require("./continuous-chart");
describe("获取字符串中连续最多的字符以及次数 - 使用嵌套循环", () => {
    it("正常情况", () => {
        const res = (0, continuous_chart_1.ContinuousChar02)(continuous_chart_1.str);
        expect(res).toEqual({ char: "e", length: 4 });
    });
    it("空字符串", () => {
        const res = (0, continuous_chart_1.ContinuousChar02)("");
        expect(res).toEqual({ char: null, length: 0 });
    });
    it("无连续字符串", () => {
        const res = (0, continuous_chart_1.ContinuousChar02)("abc");
        expect(res).toEqual({ char: "a", length: 1 });
    });
    it("全部都是连续字符串", () => {
        const res = (0, continuous_chart_1.ContinuousChar02)("aaaaaaaaaaa");
        expect(res).toEqual({ char: "a", length: "aaaaaaaaaaa".length });
    });
});
