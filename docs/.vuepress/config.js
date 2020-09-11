var MarkdownIt = require("markdown-it");
var md = new MarkdownIt();
md.use(require("markdown-it-anchor"));
md.use(require("markdown-it-table-of-contents"));

const path = require("path");
const rootpath = path.dirname(__dirname); //执行一次dirname将目录定位到docs目录
const filenames = require("./filenames.json");

module.exports = {
  title: "hailiting Blog",
  description: "hailiting Blog",
  base: "./",
  dest: "dist",
  themeConfig: {
    sidebar: filenames,
  },
};
