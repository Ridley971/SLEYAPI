module.exports = app =>{
  const articles = require("./article.controller.js")

  app.post("/articles", articles.create )
  app.get("/articles", articles.findAll)
  app.get("/articles/:articleID", articles.findOne)
}
