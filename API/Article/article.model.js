const sql = require("../db.js")

//constructor
const Article =function(article){
  this.libelle =article.libelle;
  this.datePArti= article.datePArti;
  this.dateFArti= article.dateFArti;
  this.type = article.type;
  this.idMedia = article.idMedia;
  this.corps = article.corps;

}

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO `Articles` SET ?", newArticle, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create Article: ", {id: res.insertID, ...newArticle});
            result(null, {id: res.insertID, ...newArticle})
              }
          )
}

Article.findById = (articleID, result) => {
  sql.query('SELECT * FROM Articles WHERE id = '+articleID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found Article: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Article.getAll = (result) => {
  sql.query("SELECT * FROM Articles", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("Article: ", res);
    result(null, res)
  })
}


module.exports = Article
