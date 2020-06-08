const sql = require("../db.js")

//constructor
const Formule =function(formule){
  this.libelle =formule.libelle;
  this.description= formule.description;
  this.prix= formule.prix;
  this.promo = formule.promo;
}

Formule.create = (newFormule, result) => {
  sql.query("INSERT INTO `Formules` SET ?", newFormule, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create formule: ", {id: res.insertID, ...newFormule});
            result(null, {id: res.insertID, ...newFormule})
              }
          )
}

Formule.findById = (formuleID, result) => {
  sql.query('SELECT * FROM Formules WHERE id = '+formuleID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found formule: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Formule.getAll = (result) => {
  sql.query("SELECT * FROM Formules", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("Formule: ", res);
    result(null, res)
  })
}


module.exports = Formule
