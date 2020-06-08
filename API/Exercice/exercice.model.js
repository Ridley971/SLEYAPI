const sql = require("../db.js")

//constructor
const Exercice =function(exercice){
  this.libelle =exercice.libelle;
  this.chargeMax= exercice.chargeMax;
  this.muscles= exercice.muscles;
  this.timer = exercice.timer;
  this.repetitions = exercice.repetitions;
  this.idSeance = exercice.idSeance;

}

Exercice.create = (newExercice, result) => {
  sql.query("INSERT INTO `Exercices` SET ?", newExercice, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create Exercice: ", {id: res.insertID, ...newExercice});
            result(null, {id: res.insertID, ...newExercice})
              }
          )
}

Exercice.findById = (exerciceID, result) => {
  sql.query('SELECT * FROM Exercices WHERE id = '+exerciceID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found Exercice: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Exercice.getAll = (result) => {
  sql.query("SELECT * FROM Exercices", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("Exercice: ", res);
    result(null, res)
  })
}


module.exports = Exercice
