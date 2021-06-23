const { Builder, By, Key, until } = require("selenium-webdriver");
describe("test google.com", () => {
  var driver;
  beforeEach(() => {
    console.log(111);
    driver = new Builder().forBrowser("firefox").build();
  });

  afterEach(() => {
    console.log(222);
    driver.quit();
  });

  it("should open google search", async () => {
    await driver.get("http://www.google.com/ncr");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google 搜索"), 1000);
    await driver.getTitle().then((title) => {
      console.log("```title: " + title);
      expect(title).toEqual("webdriver - Google 搜索");
    });
  }, 300000);
});
