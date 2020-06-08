const mysql = require("mysql")
const dbConfig= require("./config/db.config.js")

//Create a connection to the DB
const connection = mysql.createConnection({
                      host: dbConfig.HOST,
                      user: dbConfig.USER,
                      password: dbConfig.PASSWORD,
                      database: dbConfig.DB,
                      socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
                    })

//Open the mysql connection
connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connect to the SLEYDB");
})

module.exports= connection
