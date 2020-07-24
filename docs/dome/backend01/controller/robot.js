const marked = require("marked");
module.exports = app => {
  const { articleModal } = app.model;
  return {
    async renderArticle(req, res) {
      const { userName: author, blogDate } = req.params;
      const blogInfo = await articleModal.findOne({ author, blogDate })
      if (!blogInfo) return res.status(404).send("sorry, we cannot find that!")
      const content = marked(blogInfo.blogContent);
      return res.render("article", { title: blogInfo.blogTitle, content, author })
    },
    async renderIndex(req, res) {
      const author = req.params.userName || "Calabsh";
      const filter = { "_id": 0, "blogDate": 1, "blogTitle": 1 }
      const blogList = await articleModal.find({ author, blogType: "public" }, filter).sort({ "blogDate": -1 });
      if (!blogList) return res.status(404).send("Sorry, we cannot find that!");
      return res.render("index", { articleModal: blogList, author });
    }
  }
}