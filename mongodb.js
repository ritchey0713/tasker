// const mongoDb = require('mongodb')
// const MongoClient = mongoDb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'tasker-dev'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log("connect failed:", error)
  }
//create db
  const db = client.db(databaseName)  

  db.collection("users").updateOne({
    _id: new ObjectID("5e3c681d1e3f721ae20100c2")
  }, {
    $set: {
      name: "John"
    }
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })

}) // END-mongodb

