const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();
const express = require('express');
const User = require('./models/User');

const port = 5000
const user = User
var app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`inotebook backend listening at ${port}`)
})