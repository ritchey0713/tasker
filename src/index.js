const express = require('express')
require('./db/mongoose')

const contractorRouter = require("./routers/contractors.js")
const taskRouter = require("./routers/tasks.js")

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   console.log(req.method, req.path)
//   if(req.method === "GET") {
//     res.send("GET requests are disabled")
//   } else {
//     next()
//   }
  
// })

// app.use((req, res, next) => {
//   res.status(503).send("Under maintenance!!")
// })

app.use(express.json())
app.use(contractorRouter, taskRouter)

// without middleware => new request => run route handler

// with middleware => new request => do something => run route handler

// const multer = require("multer")
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     if(!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Must be a Word document"))
//     }
//     cb(undefined, true)
//   }
// })

// const errorMiddleWare = (req, res, next) => {
//   throw new Error("from my middleware")
// }

// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message })
// })


app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})


