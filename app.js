require("dotenv").config();

const express = require('express');
const app = express();
const port = 3000 || process.env.port;
const expressLayout = require('express-ejs-layouts');
const methodOD = require('method-override');


// Connect to DB;
const connect = require('./server/config/db');
connect();

//engine template;
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Method Overdrive
app.use(methodOD('_method'));

//public folder;
app.use(express.static('public'));

app.use('/', require('./server/routes/main'));

app.get('/add-blog', (req, res) => {
    res.render('add-blog', {title : "Add - blog"})
})

// About Page;
app.get('/about', (req, res) => {
    res.render('about', {title : 'About'});
})


app.listen(port, () => {
    console.log("connected to server");
})
