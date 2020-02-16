const request = require("supertest")
const Task = require("../src/models/task.js")
const Contractor = require("../src/models/contractor.js")
const app = require("../src/app.js")
const { contractorOne, contractorOneId, contractorTwo, contractorTwoId, setupDb, taskOne, taskTwo } = require("./fixtures/db.js")



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

  const contractor = await Contractor.findById(contractorOneId).populate("tasks")

  expect(contractor.tasks.length).toBe(3)

})

test("Should get tasks of the signed in user", async () => {
  const resp =  await request(app).get("/tasks")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)

  const contractor = await Contractor.findById(contractorOneId).populate("tasks")

  expect(contractor.tasks.length).toEqual(resp.body.length)
})

test("Should get a single task belonging to signed in user", async () => {
  const task =  await Task.findById(taskOne._id)
  await request(app).get(`/tasks/${task._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)
})

test("should not allow a user to view other users tasks", async () => {
  const task =  await Task.findById(taskTwo._id)
  const resp = await request(app).get(`/tasks/${task._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(404)
})

test("Shouldn't delete a task of another user", async () => {
  const task = await Task.findById(taskOne._id)
  await request(app).delete(`/tasks/${task._id}`)
  .set("Authorization", `Bearer ${contractorTwo.tokens[0].token}`)
  .expect(400)

  expect(task).not.toBeNull()
})

test("should update a task", async () => {
  await request(app).patch(`/tasks/${taskOne._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send({
    completed: false
  })
  .expect(200)
  const task = await Task.findById(taskOne._id)
  expect(task.completed).toBe(false)
})