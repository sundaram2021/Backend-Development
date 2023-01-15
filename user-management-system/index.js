const express = rquire("express")
const bodyparser = require("body-parser")

const app = express()

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello Homepage")
})

app.listen(PORT, () => console.log(`server running on port ${PORT}...`))