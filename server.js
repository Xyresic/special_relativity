const path = require('path');
const express = require('express');

const router = require('./routes/router')

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});