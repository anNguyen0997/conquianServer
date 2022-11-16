const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'conquianUsers'
})

app.post('/register', async(req, res) => {      // registering a new user
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // const id = req.body.id
        const username = req.body.username
        const email = req.body.email
        const password = hashedPassword 
        console.log(req.body)

        db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)',
         [username, email, password], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('User registered')
            }
        })

    } catch {
        res.send(500).send()
    }
})

app.get('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query('SELECT * WHERE username = ? AND password = ?', [username, password],
    (err, result) => {
        if (err) {
            res.send(err)
        }
        if (result) {
            res.send(result)
        } else {
            res.send({ message: 'invalid username or password' })
        }
    })
})



app.listen(3001, () => {
    console.log("server running on port 3001")
})