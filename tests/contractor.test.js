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
  await request(app).post("/contractors").send({
    name: "John",
    email: "John@example.com",
    password:"MySecret111!"
  }).expect(201)
})

test("Should login a user", async () => {
  await request(app).post("/contractors/login").send({
    email: contractorOne.email,
    password: contractorOne.password
  }).expect(200)
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

test("Should delete a contractor", async () => {
  await request(app).delete("/contractors/me")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send()
  .expect(200)
})

test("Shouldn't delete contractor if not authenticated", async () => {
  await request(app).delete("/contractors/me")
  .send()
  .expect(401)
})

