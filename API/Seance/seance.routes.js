module.exports = app =>{
  const seances = require("./seance.controller.js")

  app.post("/seances", seances.create )
  app.get("/seances", seances.findAll)
  app.get("/seances/:seanceID", seances.findOne)
}
