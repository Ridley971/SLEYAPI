const sql = require("../db.js")

//constructor
const Partenaire =function(partenaire){
  this.email =partenaire.email;
  this.nom= partenaire.nom;
  this.prenom= partenaire.prenom;
  this.portable = partenaire.portable
}

Partenaire.create = (newPartenaire, result) => {
  sql.query("INSERT INTO `Partenaires` SET ?", newPartenaire, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create partenaire: ", {id: res.insertID, ...newPartenaire});
            result(null, {id: res.insertID, ...newPartenaire})
              }
          )
}

Partenaire.findById = (partenaireID, result) => {
  sql.query('SELECT * FROM Partenaires WHERE id = '+partenaireID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found partenaire: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Partenaire.getAll = (result) => {
  sql.query("SELECT * FROM Partenaires", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("partenaires: ", res);
    result(null, res)
  })
}


module.exports = Partenaire
