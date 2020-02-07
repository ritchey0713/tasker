// const mongoDb = require('mongodb')
// const MongoClient = mongoDb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongo")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'tasker-dev'

const id = new ObjectID()

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log("connect failed:", error)
  }
//create db
  const db = client.db(databaseName)  

  // db.collection('users').insertOne({
  //   name: "Bob",
  //   age: 29
  // }, (error, result) => {
  //   if(error) {
  //     return console.log('error inserting user', error)
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([{
  //   name: "tom",
  //   age: 23
  // }, {
  //   name: "tim",
  //   age:13
  // }], (error, result) => {
  //   console.log(result.ops)
  // })
  // db.collection('tasks').insertMany([
  //   {
  //     description: "buy food",
  //     completed: false
  //   },
  //   {
  //     description: "do laundry",
  //     completed: false
  //   },
  //   {
  //     description: "clean dishes",
  //     completed: true
  //   }
  // ], (error, result) => {
  //     console.log(result.ops)
  // })
})
