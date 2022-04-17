"use strict"
let express = require('express');
let mustache = require('mustache-express');

let app = express();
app.engine('html', mustache());
app.set('view engine', 'html');app.set('views', './public/views');
app.use(express.static("public")); //pour le css

let movies = require('./movies');
movies.load('movies.json');
let file='movies.json';

app.get('/movie-details/:id', (req, res) => {
  res.render('movie-details', movies.read(req.params.id));
});

app.get('/', (req, res) => {
  res.render('movie-list',{films:movies.list()} );
});

app.get('/edit-movie-form/:id', (req, res) => {
  res.render('edit-movie-form', movies.read(req.params.id) );
});


app.get('/edit-movie/:id', (req, res) => {
  movies.update(req.params.id, req.query.title, req.query.year, req.query.actors, req.query.plot, req.query.poster);
  movies.save(file);
  res.redirect('/');
});

app.get('/delete-movie-form/:id', (req, res) => {
  res.render('delete-movie-form', movies.read(req.params.id) );
});

app.get('/delete-movie/:id', (req, res) => {
  movies.delete(req.params.id);
  movies.save(file);
  res.redirect('/');
});

app.get('/add-movie-form/', (req, res) => {
  res.render('add-movie-form', movies.read(req.params.id) );
});

app.get('/add-movie/', (req, res) => {
  movies.create(req.query.title, req.query.year, req.query.actors, req.query.plot, req.query.poster);
  movies.save(file);
  res.redirect('/');
});



app.listen(3000, () => console.log('movie server at http://localhost:3000'));

//http://127.0.0.1:3000/movie-details/0
