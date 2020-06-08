const sql = require("../db.js")

//constructor
const Coach =function(coach){
  this.email =coach.email;
  this.nom= coach.nom;
  this.prenom= coach.prenom;
  this.portable = coach.portable
}

Coach.create = (newCoach, result) => {
  sql.query("INSERT INTO `Coachs` SET ?", newCoach, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create coach: ", {id: res.insertID, ...newCoach});
            result(null, {id: res.insertID, ...newCoach})
              }
          )
}

Coach.findById = (coachID, result) => {
  sql.query('SELECT * FROM Coachs WHERE id = '+coachID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found coach: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Coach.getAll = (result) => {
  sql.query("SELECT * FROM Coachs", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("coachs: ", res);
    result(null, res)
  })
}


module.exports = Coach
