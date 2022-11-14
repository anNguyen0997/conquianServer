const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'conquianUsers'
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)',
     [username, email, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('User registered')
        }
    })
})

app.listen(3001, () => {
    console.log("server running on port 3001")
})