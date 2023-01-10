const express = require("express");
const fs = require('fs');
const app = express();

app.set("view engine", 'ejs');

app.get("/", (req, res) => {
    res.render('index.ejs');
})
app.get("/about", (req, res) => {
    res.render('about.ejs')
})


app.use((req, res) => {
    res.status(404).render('404.ejs');
})

app.listen(5555, () => {
    console.log('server running on port 4000');
})