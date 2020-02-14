const jwt = require("jsonwebtoken")
const Contractor = require("../models/contractor.js")

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', "")
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const contractor = await Contractor.findOne({ _id: decoded._id, "tokens.token": token })
    if(!contractor) {
      throw new Error()
    }

    req.token = token
    req.contractor = contractor
    next()
  }catch(err) {
    res.status(401).send({ error: "Please authenticate" })
  }
}

module.exports = auth