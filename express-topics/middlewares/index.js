const express = require("express")
const cookieParser = require('cookie-parser')

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

const requestTime = (req, res, next) => {
    req.requestTime = Date.now()
    next()
}

app.use(requestTime)

app.get('/time', (req, res) => {
    let responseText = "<h1>Hello</h1>"

    responseText += `<small>Requested at: ${req.requestTime}</small>`
    res.send(responseText)
})


async function validateCookies(req, res, next) {
    await cookieValidator(req.cookies)
    next()
}

app.use(cookieParser())
app.use(validateCookies)

//error handles
app.use((err, req, res, next) => {
    res.status(400).send(err.message)
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

