const Formule = require("./formule.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un Formule
  const formule = new Formule({
    libelle : req.body.libelle,
    description : req.body.description,
    prix : req.body.prix,
    promo : req.body.promo,
  })

  //Sauvegarder le Formule dans la BD
  Formule.create(formule, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating Formule"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Formule.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Formule."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Formule.findById(req.params.formuleID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Formule with id ${req.params.formuleID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Formule with id " + req.params.formuleID
        });
      }
    } else res.send(data);
  });
};
