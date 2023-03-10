const mysql = require("mysql");
const config = require("../../config.json");
const util = require("util");
let errorObject = require("../models/errorResponse.js");
const pool = new mysql.createConnection({
  host: config.dbServer,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

class LocalMySQL {
  constructor() {
    pool.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("MySQL Successfully connected");
      }
    });
  }

  getMethod(query, res, ...fields) {
    let finalQuery = fields == "none" ? query : util.format(query, fields.join(","));
    pool.query(finalQuery, (error, results, fields) => {
      if (error) {
        console.log(error);
        errorObject.errorMessage = error;
        return res.status(500).send(errorObject);
      }

      res.status(200).send(results);
    });
  }
}

module.exports = LocalMySQL;
