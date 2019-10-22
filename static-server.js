// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();
const port = process.env.port || 6519;
const mountPublicSource = () => `${__dirname}/${process.argv[2]}`;

app.use(express.static(mountPublicSource()));

app.listen(port);

console.log(`Running at Port ${port}`);
console.log('');
console.log(`Just click here with Ctrl pressed: >>> http://localhost:${port} <<<`);
