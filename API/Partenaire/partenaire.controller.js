const Partenaire = require("./partenaire.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un partenaire
  const partenaire = new Partenaire({
    email : req.body.email,
    nom : req.body.nom,
    prenom : req.body.prenom,
    portable : req.body.portable
  })

  //Sauvegarder le partenaire dans la BD
  Partenaire.create(partenaire, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating partenaire"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Partenaire.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Partenaire."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Partenaire.findById(req.params.partenaireID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found partenaire with id ${req.params.partenaireID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving partenaire with id " + req.params.partenaireID
        });
      }
    } else res.send(data);
  });
};
