const request = require("supertest")
const Task = require("../src/models/task.js")
const app = require("../src/app.js")
const { contractorOne, contractorOneId, setupDb } = require("./fixtures/db.js")



beforeEach(setupDb)

test("Should create a new task",  async () => {
  const resp = await request(app).post("/tasks")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send({
    description: "A test task"
  }).expect(201)

  const task = await Task.findById(resp.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toBe(false)
  
})