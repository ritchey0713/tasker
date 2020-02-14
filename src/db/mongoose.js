const mongoose = require('mongoose')

const connectionURL = process.env.URL

mongoose.connect(connectionURL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})




