const express = require('express');
const body_parser = require('body-parser');

const app = express();
app.use(body_parser.json());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;