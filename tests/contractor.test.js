const request = require('supertest')
const app = require("../src/app.js")

test("Should signup new contractor", async () => {
  await request(app).post("/contractors").send({
    name: "John",
    email: "John@example.com",
    password:"MySecret111!"
  }).expect(201)
})