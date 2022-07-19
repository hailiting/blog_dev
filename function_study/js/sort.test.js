"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sort_1 = require("./sort");
describe("sort", () => {
    it("nomorl", () => {
        const res = (0, sort_1.sortFn)(sort_1.normalArr);
        expect(res).toEqual(sort_1.normalArrExpect);
    });
    it("none arr", () => {
        const res = (0, sort_1.sortFn)([]);
        expect(res).toEqual([]);
    });
    it("negative number", () => {
        const res = (0, sort_1.sortFn)([12, -3, -6, -1, 124]);
        expect(res).toEqual([-6, -3, -1, 12, 124]);
    });
});
