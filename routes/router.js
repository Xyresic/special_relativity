const express = require('express');
const body_parser = require('body-parser');

const app = express();
app.use(body_parser.json());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('template', {title: 'Home', message: 'Hello there'});
});

module.exports = app;