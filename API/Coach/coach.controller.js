const Coach = require("./coach.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un Coach
  const coach = new Coach({
    email : req.body.email,
    nom : req.body.nom,
    prenom : req.body.prenom,
    portable : req.body.portable
  })

  //Sauvegarder le Coach dans la BD
  Coach.create(coach, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating Coach"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Coach.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Coach."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Coach.findById(req.params.coachID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Coach with id ${req.params.coachID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Coach with id " + req.params.coachID
        });
      }
    } else res.send(data);
  });
};
