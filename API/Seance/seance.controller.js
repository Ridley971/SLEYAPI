const Seance = require("./seance.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un Seance
  const seance = new Seance({
    libelle : req.body.libelle,
    duree : req.body.duree,
    nbParticipant : req.body.nbParticipant,
    idExercice : req.body.idExercice,
    idObj : req.body.idObj,
    muscles : req.body.muscles,
  })

  //Sauvegarder le Seance dans la BD
  Seance.create(seance, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating Seance"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Seance.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Seance."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Seance.findById(req.params.seanceID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Seance with id ${req.params.seanceID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Seance with id " + req.params.seanceID
        });
      }
    } else res.send(data);
  });
};
