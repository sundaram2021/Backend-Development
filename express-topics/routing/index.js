const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Home route");
});

app.post("/", (req, res) => {
  res.send("POST is created");
});

app.all("/secret", (req, res, next) => {
  res.send("Acessing the secret connection for all the HTTP method");
  next();
});

// dynamic routes

// app.get("/users/:username", (req, res) => {
//     console.log(req.url);
//     res.send("Hello " + req.params.username)
// })

app.get("/users/:username/:id", (req, res) => {
  console.log(req.url);
  res.send("Hello " + req.params.username + ", your id is : " + req.params.id);
});

// The regular expression /^\/users\/[a-z]+$/ will match URLs that start with /users/ 
//followed by one or more lowercase letters. The caret ^ character at the beginning of 
//the regular expression indicates the start of the string, and the dollar sign $ at the 
//end indicates the end of the string. The square brackets [] define a character set, 
//in this case, it's matching only lowercase letters. The plus + sign after the character 
//set means "one or more of the preceding element".

app.get(/^\/users\/[a-z]+$/, (req, res) => {
  // code to handle the request for the user's profile page
  res.send("Heelloo dffgj");
});

app.get("/op", (req, res, next) => {
    console.log(req.url);
    res.send("Res1")
    next();
},
 (req, res) => {
    console.log('res2');
 }
)

app.listen(8000, () => console.log(`server running on port 8000...`));
