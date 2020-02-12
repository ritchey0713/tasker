const jwt = require("jsonwebtoken")
const Contractor = require("../models/contractor.js")

const auth = async (req, res, next) => {
  try {

  }catch(err) {
    res.status(401).send({ error: "Please authenticate" })
  }
}

module.exports = auth