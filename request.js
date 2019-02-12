const express = require('express')
const bodyParser = require('body-parser')
const router = require('./service')
const cors = require('cors')

var app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function(req, res){     
    res.json({ info: 'Node.js, Express, and Postgres API' })
})


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use('/Users', cors(corsOptions), router)

/*
app.options('*', cors())
app.use('/Users', router)

*/

app.listen(3000)
