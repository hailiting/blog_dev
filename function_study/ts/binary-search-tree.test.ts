import { getKthValue, tree } from "./binary-search-tree";
/**
 * 二叉搜索树
 */
describe("二叉搜索树", () => {
  it("正常情况", () => {
    const res = getKthValue(tree, 3);
    console.log(res);
    expect(res).toBe(5);
  });
  it("k 不在正常范围内", () => {
    const res2 = getKthValue(tree, 100);
    expect(res2).toBeNull();
  });
});
