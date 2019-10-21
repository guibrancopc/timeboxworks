// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();

const mountPublicSource = () => `${__dirname}/${process.argv[2]}`;

app.use(express.static(mountPublicSource()));

app.listen(process.env.port || 6519);

console.log('Running at Port 6519');
console.log('');
console.log('>>> http://localhost:6519 <<<');
