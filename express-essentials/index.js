import express from 'express';
// import data from './data/mock.json' assert {type: 'json'};

const app = express();
const PORT = process.env.PORT || 9000;

//GET
app.get("/", (req, res) => {
    res.send("This is get request");
})

//POST
app.post("/create", (req, res) => {
    res.send("This is a post request");
})

//PUT
app.put("/edit", (req, res) => {
    res.send("This is a put request");
})

//Delete
app.delete("/delete", (req, res) => {
    res.send("This is a delete request");
})

app.listen(PORT, () => {
console.log(`app running on port ${PORT}...`);
})
