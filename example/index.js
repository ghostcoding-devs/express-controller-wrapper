const express = require('express')
const app = express()
const routes = require('./routes.js')()
const PORT = 3000
app.use('/', routes)

app.use((error, _req, res, _next) => {
  return res.status(500).json({...error})
})

app.listen(PORT, () => {
  console.log(`Example Util Server Running on Port: ${PORT}`)
  console.group()
  console.log('Trigger [http://localhost:3000/error] to see it in action')
  console.groupEnd()
})
