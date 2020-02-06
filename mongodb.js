const mongoDb = require('mongodb')
const MongoClient = mongoDb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'tasker-dev'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log("connect failed:", error)
  }

  console.log("connected successfully!")
})