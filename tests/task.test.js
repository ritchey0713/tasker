const request = require("supertest")
const Task = require("../src/models/task.js")
const Contractor = require("../src/models/contractor.js")
const app = require("../src/app.js")
const { contractorOne, contractorOneId, setupDb, taskOne, taskTwo } = require("./fixtures/db.js")



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

test("Should get tasks of the signed in user", async () => {
  const resp =  await request(app).get("/tasks")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)

  const contractor = await Contractor.findById(contractorOneId).populate("tasks")

  expect(contractor.tasks.length).toEqual(resp.body.length)
})