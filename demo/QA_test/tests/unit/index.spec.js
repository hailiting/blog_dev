// jasmine
// 单元测试
describe("函数基本API测试", function() {
  it("+1函数是否可用", function() {
    expect(window.add(1)).toBe(1);
    expect(window.add(2)).toBe(3);
  });
});
