const Mocha = require("mocha");
const mocha = new Mocha({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "./docs/mochawesome-report",
    reportFilename: "mochawesome-report"
  }
});

mocha.addFile("./service/router.spec.js");
mocha.run(function () {
  process.exit();
})