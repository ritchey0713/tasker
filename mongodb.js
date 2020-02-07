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

  // db.collection('users').insertOne({
  //   _id: id,
  //   name: "Dan",
  //   age: 55
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

  // db.collection('users').findOne({ _id: new ObjectID("5e3cd620e63eec3405b30868") }, (error, user) => {
  //   if(error){
  //     return console.log("user not found")
  //   }
  //   console.log("user:", user)
  // })

  // db.collection('users').find({ age: 13 }).toArray((error, users) => {
  //   console.log(users)
  // })

  // db.collection('users').find({ age: 13 }).count((error, count) => {
  //   console.log(count)
  // })

  db.collection("tasks").findOne({ _id: new ObjectID("5e3c8e7f20bde822dfb60d76") }, (error, task) => {
    console.log(task)
  })

  db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    console.log(tasks)
  })
  

}) // END-mongodb

