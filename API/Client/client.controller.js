const Client = require("./client.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un Client
  const client = new Client({
    email : req.body.email,
    nom : req.body.nom,
    prenom : req.body.prenom,
    sexe : req.body.sexe,
    dateN : req.body.dateN,
    adresse : req.body.adresse,
    ville : req.body.ville,
    cp : req.body.cp,
    portable : req.body.portable,
    taille : req.body.taille,
    poids : req.body.poids,
    txGraisse : req.body.txGraisse,
    txCible : req.body.txCible,
    idObj : req.body.idObj,
  })

  //Sauvegarder le Client dans la BD
  Client.create(client, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating Client"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Client."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Client.findById(req.params.clientID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${req.params.clientID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Client with id " + req.params.clientID
        });
      }
    } else res.send(data);
  });
};
