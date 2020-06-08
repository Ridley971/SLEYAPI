module.exports = app =>{
  const coachs = require("./coach.controller.js")

  app.post("/coachs", coachs.create )
  app.get("/coachs", coachs.findAll)
  app.get("/coachs/:coachID", coachs.findOne)
}
