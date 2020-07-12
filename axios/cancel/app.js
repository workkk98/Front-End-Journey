const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.get('/api/test', function (req, res) {
  res.send('success')
})

app.listen(8012, function () {
  console.log('serve is running at 8012')
})