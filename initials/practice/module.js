const fs = require('fs');


//  reading data from the file
// fs.readFile("./docs/test.txt", (error, data) => {
//     if(error) {
//         console.log(error);
//     } 
//     console.log(data.toString());
// })


// writing data to the file
// fs.writeFile("./docs/test3.txt", "Hello world",  () => {
//     console.log('file written');
// })


// directories
// if(!fs.existsSync("./assets")){
//     fs.mkdir("./assets", (error) => {
//         if(error){
//             console.log(error);
//         }
//         console.log('folder created');
//     })
// } else {
//     fs.rmdir("./assets", (e) => {
//         if(e){
//             console.log(e);
//         } else {
//             console.log('folder deleted');
//         }
//     })
// }


//deleting files
// if(fs.existsSync("./docs/test3.txt")) {
//     fs.unlink('./docs/test3.txt', (e) => {
//         console.log(e);
//     })
// }

//creating streams for bigger file data

const readStream = fs.createReadStream('./docs/test2.txt');
const writeStream = fs.createWriteStream('./docs/test.txt');

// readStream.on('data', (chunk) => {
//     console.log(chunk.toString());
//     writeStream.write("\nNEW CHUNK\n")
//     writeStream.write(chunk);
// })


//piping -> sending data through a pipe from readStream to writeStream
readStream.pipe(writeStream);