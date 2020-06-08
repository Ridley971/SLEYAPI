module.exports = app =>{
  const reservations = require("./reservation.controller.js")

  app.post("/reservations", reservations.create )
  app.get("/reservations", reservations.findAll)
  app.get("/reservations/:reservationID", reservations.findOne)
  app.put("/reservations/:reservationID", reservations.update)
}
