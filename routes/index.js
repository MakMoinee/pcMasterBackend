var express = require("express");
var router = express.Router();
const LocalMysql = require("../src/repository");
const lMysql = new LocalMysql();
const errorObject = require("../src/models/errorResponse");
const config = require("../config.json");

router.post("/", function (req, res, next) {
  if (req.headers.apikey === undefined) {
    errorObject.errorMessage = "Unauthorized access, Please provide apiKey";
    return res.status(401).send(errorObject);
  } else if (req.headers.apikey != config.apiKey) {
    errorObject.errorMessage =
      "Unauthorized access, Please provide valid apiKey";
    return res.status(401).send(errorObject);
  }

  let queryValid = req.body.query === undefined ? true : false;
  if (queryValid) {
    errorObject.errorMessage = "query field is required";
    return res.status(400).send(errorObject);
  }

  let fieldsValid = req.body.fields === undefined ? true : false;
  if (fieldsValid) {
    errorObject.errorMessage = "field/s is/are required";
    return res.status(400).send(errorObject);
  }

  lMysql.postMethod(req.body.query, res, req.body.fields);
});

router.get("/", function (req, res, next) {
  errorObject.errorMessage =
      "default no page";
  return res.status(500).send(errorObject);
});

module.exports = router;
