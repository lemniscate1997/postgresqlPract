const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:Rahul1234@localhost:5432/pract'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pract',
  password: 'Rahul1234',
  port: 5432,
})

pool.query('SELECT * from public.user', (err, res) => {
  console.log(res.rows)
  pool.end()
})

const client = new Client({
    connectionString: connectionString,
  })
  client.connect()
  
  client.query('SELECT NOW()', (err, res) => {
    console.log(res.rows[0])
    client.end()
  })