const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/coverage/lcov-report/`));

app.listen(process.env.port || 6519);

console.log('Running at Port 6519');
console.log('');
console.log('>>> http://localhost:6519 <<<');
