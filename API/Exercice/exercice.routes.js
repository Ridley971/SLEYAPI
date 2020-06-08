module.exports = app =>{
  const exercices = require("./exercice.controller.js")

  app.post("/exercices", exercices.create )
  app.get("/exercices", exercices.findAll)
  app.get("/exercices/:exerciceID", exercices.findOne)
}
