const request = require('supertest')
const app = require("../src/app.js")
const Contractor = require("../src/models/contractor.js")

const contractorOne = {
  name: "Mike",
  email: "Mike@mike.com",
  password: "Mike123"
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

