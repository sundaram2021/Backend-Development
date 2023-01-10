const express = require("express");
const fs = require('fs');
const app = express();
app.set("view engine", 'ejs');

app.get("/", (req, res) => {
    res.render('./practice/index')
})

app.get("/about", (req, res) => {
    res.sendFile("/practice/about.html", { root: __dirname }, (e) => {
        if(e) {
            console.log(e);
        }
    })
})

app.get("/about-us", (req, res) => {
    res.redirect("/about");
})

app.use((req, res) => {
    res.status(404).sendFile('/practice/404.html', { root: __dirname })
})

app.listen(4000, () => {
    console.log('server running on port 4000');
})