const express = require('express');

const app = express();
const port = process.env.port || process.argv[3] || 6519;
const mountPublicSource = () => `${__dirname}/${process.argv[2]}`;

app.use(express.static(mountPublicSource()));

app.listen(port);

console.log(`Running at Port ${port}`);
console.log('');
console.log(`Just click here with Ctrl/Command pressed: >>> http://localhost:${port} <<<`);
