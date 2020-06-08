module.exports = app =>{
  const partenaires = require("./partenaire.controller.js")

  app.post("/partenaires", partenaires.create )
  app.get("/partenaires", partenaires.findAll)
  app.get("/partenaires/:partenaireID", partenaires.findOne)
}
