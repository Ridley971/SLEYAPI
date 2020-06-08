module.exports = app =>{
  const formules = require("./formule.controller.js")

  app.post("/formules", formules.create )
  app.get("/formules", formules.findAll)
  app.get("/formules/:formuleID", formules.findOne)
}
