const { Pool } = require('pg')
const connectionString = 'postgresql://postgres:Rahul1234@localhost:5432/pract'
const express = require('express');
const router = express.Router();

/*
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pract',
  password: 'Rahul1234',
  port: 5432,
})
*/

const pool = new Pool({
    connectionString : connectionString
})

const getUsers = (request, response, next) => {
    pool.query('SELECT * FROM public.user', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response, next) => {
    let id = request.params.id;
    pool.query('SELECT * FROM public.user where uid = $1',[id],  (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows);
    })
}

const createUser = (request, response, next) => {
    let {id, name, salary} = request.body
    pool.query('insert into public.user(uid, name, salary) values ($1, $2, $3)',[id, name, salary],  (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`new user created successfully`)
    })
}

const deleteUser = (request, response, next) => {
    let id = request.params.id
    pool.query(' delete from public.user where uid = $1 ',[id],  (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`user of id : ${id} deleted successfully`)
    })
}

const updateUser = (request, response, next) => {
    let id = request.params.id
    let {name, salary} = request.body
    pool.query(' UPDATE public.user SET name = $2, salary = $3 WHERE uid = $1' ,[id, name, salary],  (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`user of id : ${id} updated successfully`)
    })
}

router.get("/", getUsers)
router.get("/:id", getUserById)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router;