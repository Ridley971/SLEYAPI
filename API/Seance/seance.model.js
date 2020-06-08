const sql = require("../db.js")

//constructor
const Seance =function(seance){
  this.libelle =seance.libelle;
  this.duree= seance.duree;
  this.nbParticipant= seance.nbParticipant;
  this.idExercice = seance.idExercice;
  this.idObj = seance.idObj;
  this.muscles = seance.muscles;
}

Seance.create = (newSeance, result) => {
  sql.query("INSERT INTO `Seances` SET ?", newSeance, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create seance: ", {id: res.insertID, ...newSeance});
            result(null, {id: res.insertID, ...newSeance})
              }
          )
}

Seance.findById = (seanceID, result) => {
  sql.query('SELECT * FROM Seances WHERE id = '+seanceID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found seance: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Seance.getAll = (result) => {
  sql.query("SELECT * FROM Seances", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("Seance: ", res);
    result(null, res)
  })
}


module.exports = Seance
