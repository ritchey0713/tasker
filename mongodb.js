const mongoDb = require('mongodb')
const MongoClient = mongoDb.MongoClient

const connectionURL = "mongo://127.0.0.1:27017"
const databaseName = 'tasker-dev'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  
})