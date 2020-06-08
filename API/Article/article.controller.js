const Article = require("./article.model.js")

exports.create =(req, res)=> {
  //Valider la requete
  if (!req.body) {
    res.status(400).send({message:"Content can not be empty"})
  }

  //Créer un Article
  const article = new Article({
    libelle : req.body.libelle,
    datePArti : req.body.datePArti,
    dateFArti : req.body.dateFArti,
    type : req.body.type,
    idMedia : req.body.idMedia,
    corps : req.body.corps,

  })

  //Sauvegarder le Article dans la BD
  Article.create(article, (err, data) => {
    if(err)
      res.status(500).send({message:err.message||" Some error occured while creating Article"})
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Article.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Article."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Article.findById(req.params.articleID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Article with id ${req.params.articleID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Article with id " + req.params.articleID
        });
      }
    } else res.send(data);
  });
};
