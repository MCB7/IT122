  
"use strict"

//import * as data from "./data.js";
import express from 'express';
import handlebars from "express-handlebars"
import { Human } from "../IT_122_javascript/models/human.js";



const app = express();


app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

// app.get('/', (req,res) => {
//     res.render('home', {humans: data.getAll()});
// });


// app.get('/about', (req,res) => {
//     res.type('text/plain');

//     res.send('About');
// });

// app.get('/delete', (req,res) => {
//     let result = data.deleteItem(req.query.title);
//     res.render('delete', {
//         title: req.query.title, 
//         result: result
//     }
//     );
// });

// app.get('/add', (req,res)=>{
//     let result = req.query
//     data.addItem(result)
//     res.render('details', {
//         title: req.query.title, 
//         result: result
//     });
// });

// app.get('/detail', (req,res) => {
//     let result = data.getItem(req.query.title);
//     res.render("details", {
//         title: req.query.title, 
//         result
//         }
//     );
// });

// app.post('/detail', (req,res) => {
//    let found = data.getItem(req.body.name);
//     res.render("details", {
//         name: req.body.name, 
//         result: found, 
//         humans: data.getAll()});
// });

app.get('/', (req,res) => {
    Human.find({}).lean()
        .then((humans) => {
            res.render('home', { humans });
        })
        .catch(err => next(err));
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



app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});