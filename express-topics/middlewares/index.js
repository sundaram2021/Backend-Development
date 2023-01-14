const express = require("express")

const app = express()
const PORT = 8000;

// middlewares
const myLogger = (req, res, next) => {
    console.log('LOGGED');
    next()
}

app.use(myLogger)

app.get('/', (req, res) => {
    res.send("hello middlewares")
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))