const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const app = require("../src/app.js")
const Contractor = require("../src/models/contractor.js")


const contractorOneId = new mongoose.Types.ObjectId()
const contractorOne = {
  _id: contractorOneId,
  name: "Mike",
  email: "Mike@mike.com",
  password: "Mike123",
  tokens: [{
    token: jwt.sign({
      _id: contractorOneId
    }, process.env.JWT_TOKEN)
  }]
}

beforeEach(async () => {
  await Contractor.deleteMany()
  await new Contractor(contractorOne).save()
})

test("Should signup new contractor", async () => {
  const resp = await request(app).post("/contractors").send({
    name: "John",
    email: "John@example.com",
    password:"MySecret111!"
  }).expect(201)
  // check db change 
  const contractor = await Contractor.findById(resp.body.contractor._id)
  expect(contractor).not.toBeNull() 

  //assert body 
  expect(resp.body.contractor.name).toBe("John")
  expect(resp.body).toMatchObject({
    contractor: {
      name: "John",
      email: "john@example.com"
    },
    token: contractor.tokens[0].token
  })
  expect(contractor.password).not.toBe("MySecret111!")
})

test("Should login a user", async () => {
  const resp = await request(app).post("/contractors/login").send({
    email: contractorOne.email,
    password: contractorOne.password
  }).expect(200)
  // check token is added on login
  const contractor = await Contractor.findById(contractorOne._id)
  expect(resp.body.token).toBe(contractor.tokens[1].token)
})

test("Should logout a user", async () => {
  await request(app).post("/contractors/logout")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send()
  .expect(200)
  
  await request(app).get("/contractors/me")
  // make sure original token is bad
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send()
  .expect(401)
})

test("Should not login a non-existent user", async () => {
  await request(app).post("/contractors/login").send({
    email: "Bad User",
    password: "NotSoSecret"
  }).expect(400)
})

test("should get profile for contractor", async () => {
  await request(app).get("/contractors/me")
    .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Should not get profile for unauthenticated contractor", async () => {
  await request(app).get("/contractors/me")
  .send()
  .expect(401)
})

test("Should update a contractor data", async () => {
  await request(app).patch("/contractors/me")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send({
    name: "Sally",
    age: 30
  }).expect(200)
  const contractor = await Contractor.findById(contractorOne._id)
  expect(contractor).not.toBe("John")
  expect(contractor).not.toBe(0)
})

test("Can not update another users profile", async () => {
  await request(app).patch("/contractors/me")
  .send({
    name: "Not good",
    age: 22
  }).expect(401)
})

test("Should delete a contractor", async () => {
  const resp = await request(app).delete("/contractors/me")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send()
  .expect(200)

  const contractor = await Contractor.findById(contractorOne._id)
  expect(contractor).toBeNull()
})

test("Shouldn't delete contractor if not authenticated", async () => {
  await request(app).delete("/contractors/me")
  .send()
  .expect(401)
})

