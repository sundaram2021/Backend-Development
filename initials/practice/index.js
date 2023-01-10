const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    if(req.url === '/about'){
        fs.readFile('./about.html', (err, data) => {
            if(err){
                console.log(err);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        })
    }
    else if(req.url === '/'){
        fs.readFile('./index.html', (err, data) => {
            if(err){
                console.log(err);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        })
    }
    else{
        fs.readFile("404.html", (err, data) => {
            if(err){
                console.log(err);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        })
    }
})

server.listen(3000, "localhost", () => {
    console.log('server running on port 3000...');
})