"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
db.prepare('DELETE FROM movies').run();
db.prepare("Create Table if not exists movies(id integer Primary Key, Title text,Year integer, actors text, Plot text, Poster text)").run();
db.prepare("INSERT INTO movies values ('1','Break', '2020', 'yanis', 'on verra','joli poster')").run();

console.log(db.prepare("select * from movies ").all());
exports.load = function(filename) {
  db.prepare('DELETE FROM movies').run();
  const movies = JSON.parse(fs.readFileSync(filename));
  let insert = db.prepare('INSERT INTO movies VALUES ' +
                          '(@id, @title, @year,' +
                          ' @actors, @plot, @poster)');
  let clear_and_insert_many = db.transaction((movies) => {
    db.prepare('DELETE FROM movies');
    for (let id of Object.keys(movies)) {
      insert.run(movies[id]);
    }
  });
  clear_and_insert_many(movies);
  return true;
};

exports.save = function(filename) {
  let movie_list = db.prepare('SELECT * FROM movies ORDER BY id').all();
  let movies = {};
  for (let movie of movie_list) {
    movies[movie.id] = movie;
  }
  fs.writeFileSync(filename, JSON.stringify(movies));
};

exports.list = function() {
  let movie_list = db.prepare("Select * From movies order by id ").all();
  if(movie_list.length<=0){
    return [];
  }
  return movie_list;

};

exports.create = function(title, year, actors, plot, poster) {
  let new_movie = db.prepare("INSERT INTO movies (title, year, actors, plot, poster) values (?,?,?,?,?)");
  return new_movie.run(title, year, actors, plot, poster).lastInsertRowid;
};

exports.read = function(id) {
  let movie_info = db.prepare("Select * from movies where id = ? ").get(id);
  if(movie_info== undefined){
    return null;
  }
  return movie_info;
};

exports.update = function(id, title, year, actors, plot, poster) {
  let movie_update = db.prepare("Update movies set (title, year, actors, plot, poster) = (?,?,?,?,?)where id = ?") ;
  if((db.prepare("Select * from movies").all().length)<id){
    return false;
  }
  movie_update.run(title, year, actors, plot, poster,id);
  return true;
};

exports.delete = function(id) {
  let delete_movie = db.prepare("DELETE from movies where id = ?");
  if((db.prepare("Select * from movies").all().length)<id){
    return false;
  }
  delete_movie.run(id);
  return true;
};
