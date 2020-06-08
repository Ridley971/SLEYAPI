const sql = require("../db.js")

//constructor
const Reservation =function(reservation){
  this.dateRes =reservation.dateRes;
  this.idCli= reservation.idCli;
  this.idSeance= reservation.idSeance;
  this.idCoach = reservation.idCoach;
  this.idPart = reservation.idPart;
  this.statut = reservation.statut;
}

Reservation.create = (newReservation, result) => {
  sql.query("INSERT INTO `Reservations` SET ?", newReservation, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create Reservation: ", {id: res.insertID, ...newReservation});
            result(null, {id: res.insertID, ...newReservation})
              }
          )
}

Reservation.findById = (reservationID, result) => {
  sql.query('SELECT * FROM Reservations WHERE id = '+reservationID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found Reservation: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Reservation.getAll = (result) => {
  sql.query("SELECT * FROM Reservations", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("Reservations: ", res);
    result(null, res)
  })
}

Reservation.updateByID = (id, reservation, result) => {
  var sqlQuery = `UPDATE Reservations SET
                        idSeance = ${reservation.idSeance},
                        idCoach = ${reservation.idCoach},
                        idPart = ${reservation.idPart},
                        statut = "${reservation.statut}"
                  WHERE Reservations.id = ${id}`

  sql.query(sqlQuery,
          (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(null, err);
                  return;
                }

                if (res.affectedRows == 0) {
                  //not found
                  result({kind: "not_found"}, null)
                  return
                }

            console.log("updated reservation : ", {id: id, ...reservation});
            result(null, {id: id, ...reservation})
          }
        )
}

module.exports = Reservation
