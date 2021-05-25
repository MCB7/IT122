  
"use strict"

//import * as data from "./data.js";
import express from 'express';
import handlebars from "express-handlebars"
import { Human } from "../IT_122_javascript/models/human.js";
import cors from 'cors';



const app = express();


app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route


app.get('/', (req,res) => {
    Human.find({}).lean()
        .then((humans) => {
           //res.render('home', { humans });
           res.render('home', {humans: JSON.stringify(humans)});
        });
        //.catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req,res,next) => {
    Human.findOne({ name:req.query.title }).lean()
        .then((human) => {
            res.render('details', {result: human} );
        })
        .catch(err => next(err));
});

app.post('/detail', (req,res, next) => {
    Human.findOne({ name:req.body.title }).lean()
        .then((human) => {
            res.render('details', {result: human} );
        })
        .catch(err => next(err));
});

app.get('/delete', (req,res) => {
    Human.remove({ name:req.query.title }, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Human.count((err, total) => {
            res.type('text/html');
            res.render('delete', {name: req.query.title, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

//API ROUTES

    app.get('/api/humans', (req,res, next) => {
        Human.find({}).lean()
            .then((humans) => {
                res.json(humans)
            })
            .catch(err => next(err));

        });



    app.get('/api/human/:title', (req, res, next) => {
        let surname = req.params.title;
        Human.findOne({name: surname}, (err, result) => {
            if (err || !result) return next(err);
            res.json( result );    
        });
    });

    app.get('/api/delete/:title', (req, res, next) => {
        let surname = req.params.title;
        Human.deleteOne({name: surname}, (err, result) => {
            if (err || !result) return next(err);
            res.json( result );    
        });
    });

    app.get('/api/add/:title/:age/:color/:shape', (req,res, next) => {
        let surname = req.params.title;
        Human.updateOne({ name: surname}, { name:surname, age: req.params.age, color: req.params.color, shape: req.params.shape }, {upsert: true }, (err, result) => {
            if (err) return next(err);
            // nModified = 0 for new item, = 1+ for updated item 
            res.json({updated: result.nModified});
        });
    });








app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});