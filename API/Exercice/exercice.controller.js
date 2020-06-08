const Exercice = require("./exercice.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un Exercice
  const exercice = new Exercice({
    libelle : req.body.libelle,
    chargeMax : req.body.chargeMax,
    muscles : req.body.muscles,
    timer : req.body.timer,
    repetitions : req.body.repetitions,
    idSeance : req.body.idSeance,
  })

  //Sauvegarder le Exercice dans la BD
  Exercice.create(exercice, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating Exercice"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Exercice.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Exercice."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Exercice.findById(req.params.exerciceID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Exercice with id ${req.params.exerciceID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Exercice with id " + req.params.exerciceID
        });
      }
    } else res.send(data);
  });
};
