const Reservation = require("./reservation.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un Reservation
  const reservation = new Reservation({
    idCli : req.body.idCli,
    idSeance : req.body.idSeance,
    dateRes : req.body.dateRes,
    idCoach : req.body.idCoach,
    idPart : req.body.idPart,
    statut : req.body.statut
  })

  //Sauvegarder le Reservation dans la BD
  Reservation.create(reservation, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating Reservation"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Reservation.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reservation."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Reservation.findById(req.params.reservationID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Reservation with id ${req.params.reservationID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Reservation with id " + req.params.reservationID
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message : " Content can't be empty !"
    })
  }

  Reservation.updateByID(
    req.params.reservationID,
    new Reservation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind ==="not_found") {
          res.status(404).send({
            message:`Not found Reservation with id : ${req.params.reservationID}.`
          });
          console.log(req.body);
        } else {
          res.status(500).send({
            message:`Error updating Reservation with id : ${req.params.reservationID}.`
          });
        }
      } else res.send(data);
    }
  );
};
