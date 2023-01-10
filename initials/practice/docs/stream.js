const fs = require('fs');

fs.readFile("./docs/test.txt", (error, data) => {
    if(error) {
        console.log(error);
    } 
    console.log(data);
})

