"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_search_tree_1 = require("./binary-search-tree");
/**
 * 二叉搜索树
 */
describe("二叉搜索树", () => {
    it("正常情况", () => {
        const res = (0, binary_search_tree_1.getKthValue)(binary_search_tree_1.tree, 3);
        console.log(res);
        expect(res).toBe(5);
    });
    it("k 不在正常范围内", () => {
        const res2 = (0, binary_search_tree_1.getKthValue)(binary_search_tree_1.tree, 100);
        expect(res2).toBeNull();
    });
});
