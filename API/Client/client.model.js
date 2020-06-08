const sql = require("../db.js")

//constructor
const Client =function(client){
  this.email =client.email;
  this.nom= client.nom;
  this.prenom= client.prenom;
  this.sexe = client.sexe;
  this.dateN = client.dateN;
  this.adresse = client.adresse;
  this.ville = client.ville;
  this.cp = client.cp;
  this.portable = client.portable;
  this.taille = client.taille;
  this.poids = client.poids;
  this.txGraisse = client.txGraisse;
  this.txCible = client.txCible;
  this.idObj = client.idObj
}

Client.create = (newClient, result) => {
  sql.query("INSERT INTO `Clients` SET ?", newClient, (err, res) => {
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

            console.log("create client: ", {id: res.insertID, ...newClient});
            result(null, {id: res.insertID, ...newClient})
              }
          )
}

Client.findById = (clientID, result) => {
  sql.query('SELECT * FROM Clients WHERE id = '+clientID, (err, res) =>{
              if(err){
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }

                if (res.length) {
                  console.log("Found client: ", res[0]);
                  result(null, res[0]);
                  return
                }
            //not found
            result({kind: "not_found"}, null)
          }
        )
}

Client.getAll = (result) => {
  sql.query("SELECT * FROM Clients", (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }

    console.log("Client: ", res);
    result(null, res)
  })
}


module.exports = Client
