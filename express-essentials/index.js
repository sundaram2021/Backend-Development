import express from 'express';
import data from './data/mock.json' assert {type: 'json'};

const app = express();
const PORT = process.env.PORT || 9000;

//using the public folder at the root of the project
app.use(express.static('public'))

//using the images folder at the route
app.use("/images", express.static("images"))

//GET - next()
app.get("/", (req, res, next) => {
    console.log("The response will be sent by the next function");
    next();
},
    (req, res) => {
      res.send("I just set up a route with a second callback")
    }
)

//GET - download method
app.get("/download", (req, res) => {
    res.download("images/m2.jpg")
})

app.route("/class",).get((req, res) => {
    res.send("Retrieve class info")
}).post((req, res) => {
    res.send("creating class info")
}).put((req, res) => {
    res.send("update class info")
})

//GET - redirect method
app.get("/redirect", (req, res) => {
    res.redirect("https://www.linkedin.com")
})

//GET with routing parameters
// app.get("/class/:id", (req, res) => {
//     const studentId = Number(req.params.id);

//     const student = data.filter((student) => {
//         return student.id === studentId
//     })

//     res.send(student)
// })

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
