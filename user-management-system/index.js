const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
// const data = require("./data/mock.json")
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.set("views", path.join(__dirname, "views"));
app.use(bodyparser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.post("/", (req, res) => {
    let inputData = req.body.input;
    console.log(inputData);
})

app.get("/users", (req, res) => {
  fs.readFile("./data/mock.json", "utf8", function (err, data) {
    if (err) {
      res.send(err);
    } else {
      let jsonData = JSON.parse(data);
      let firstName = jsonData.map((a) => a.first_name);
      res.send(firstName);
    }
  });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}...`));
