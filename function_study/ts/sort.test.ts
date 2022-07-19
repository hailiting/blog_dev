import { normalArr, normalArrExpect, sortFn } from "./sort";
describe("sort", () => {
  it("nomorl", () => {
    const res = sortFn(normalArr);
    expect(res).toEqual(normalArrExpect);
  });
  it("none arr", () => {
    const res = sortFn([]);
    expect(res).toEqual([]);
  });
  it("negative number", () => {
    const res = sortFn([12, -3, -6, -1, 124]);
    expect(res).toEqual([-6, -3, -1, 12, 124]);
  });
});
