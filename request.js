const express = require('express')
const bodyParser = require('body-parser')
const router = require('./service')
const cors = require('cors');

var app = express()
app.options('*', cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function(req, res){     
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/Users', router)

app.listen(3000);
