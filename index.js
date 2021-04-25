  
"use strict"

import * as data from "./data.js";
import express from 'express';
import handlebars from "express-handlebars"

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    res.render('home', {humans: data.getAll()});
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
});

app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = data.getItem(req.query.title);
    res.render("details", {
        title: req.query.title, 
        result
        }
    );
});

// handle POST
app.post('/detail', (req,res) => {
    console.log(req.body)
    let found = data.getItem(req.body.name);
    res.render("details", {name: req.body.name, result: found, humans: data.getAll()});
});

// define 404 handler
app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});