const path = require('path');
const util = require('util');

console.log(path.basename(__filename));

const dirUploads = path.join(__dirname, "www", "files", "uploads");

console.log(dirUploads);
util.log(path.basename(__filename))