const request = require("supertest")
const Task = require("../src/models/task.js")
const Contractor = require("../src/models/contractor.js")
const app = require("../src/app.js")
const { contractorOne, 
        contractorOneId, 
        contractorTwo, 
        contractorTwoId, 
        setupDb, 
        taskOne, 
        taskTwo,
        taskThree 
      } = require("./fixtures/db.js")



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

test("shouldn't create a test without a description", async () => {
  await request(app).post("/tasks")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send({
    completed: true
  })
  .expect(400)
})

test("Should not create a task for unauthenticated user", async () => {
  await request(app).post("/tasks")
  .send({
    description: "Test task"
  })
  .expect(401
    )
})

test("Should get tasks of the signed in user", async () => {
  const resp =  await request(app).get("/tasks")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)

  const contractor = await Contractor.findById(contractorOneId).populate("tasks")

  expect(contractor.tasks.length).toEqual(resp.body.length)
})

test("Should get a single task belonging to signed in user", async () => {
  const task = await Task.findById(taskOne._id)
  await request(app).get(`/tasks/${task._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)

  expect(task.description).toBe("First test task")
})

test("should not allow a user to view other users tasks", async () => {
  const task =  await Task.findById(taskTwo._id)
  await request(app).get(`/tasks/${task._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(404)
})

test("should delete a users task", async () => {
  const resp = await request(app).delete(`/tasks/${taskOne._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)

  const task = await Task.findById(taskOne._id)
  expect(task).toBeNull()
})

test("Shouldn't delete a task of another user", async () => {
  const task = await Task.findById(taskOne._id)
  await request(app).delete(`/tasks/${task._id}`)
  .set("Authorization", `Bearer ${contractorTwo.tokens[0].token}`)
  .expect(400)

  expect(task).not.toBeNull()
})

test("Should not delete if not authenticated", async () => {
  await request(app).delete(`/tasks/${taskOne._id}`)
  .expect(401)
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

test("should not update another users task", async () => {
  await request(app).patch(`/tasks/${taskTwo._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send({
    description: "test"
  })
  .expect(404)
})

test("should only fetch completed tasks for the user", async () => {
  const resp = await request(app).get("/tasks?completed=true")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)

  expect(resp.body.length).toBe(1)
})

test("should only fetch incomplete tasks for the user", async () => {
  const resp = await request(app).get("/tasks?completed=false")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)

  expect(resp.body.length).toBe(1)
})

test("should sort by createdAt", async () => {
  const resp = await request(app).get("/tasks?sortBy=createdAt_desc")
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .expect(200)
  expect(resp.body[0]._id).toEqual(taskThree._id.toString())
})

test("Should paginate the users tasks")

test("should not allow update without a description value", async () => {
  delete taskOne.description
  await request(app).patch(`/tasks/${taskOne._id}`)
  .set("Authorization", `Bearer ${contractorOne.tokens[0].token}`)
  .send(taskOne)
  .expect(400)
})

