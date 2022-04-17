"use strict";

const fs = require('fs');

let movies = {};
let next_id = 0;

exports.load = function(filename) {
  movies = JSON.parse(fs.readFileSync(filename));
  next_id = 1 + Math.max(...Object.keys(movies));
};

exports.save = function(filename) {
  // make sure to only save the right fields
  let replacer = function(key,value) {
    if (['id', 'title', 'year', 'actors', 'plot', 'poster'].includes(key)) {
      return value;
    } else {
      return undefined;
    }
  };
  //fs.writeFileSync(filename, JSON.stringify(movies, replacer));
    fs.writeFileSync(filename, JSON.stringify(movies));
};

exports.list = function() {
  let movie_list = Object.values(movies).sort((a, b) => a.id - b.id);
  return movie_list;
};

exports.create = function(title, year, actors, plot, poster) {
  let movie = {
    id: next_id++,
    title: title,
    year: year,
    actors: actors,
    plot: plot,
    poster: poster,
  };
  movies[movie.id] = movie;
  return movie.id;
};

exports.read = function(id) {
  if(id in movies) {
    return movies[id];
  } else {
    return null;
  }
};

exports.update = function(id, title, year, actors, plot, poster) {
  if(id in movies) {
    movies[id].title = title;
    movies[id].year = year;
    movies[id].actors = actors;
    movies[id].plot = plot;
    movies[id].poster = poster;
    return true;
  } else {
    return false;
  }
};

exports.delete = function(id) {
  if(id in movies) {
    delete movies[id];
    return true;
  } else {
    return false;
  }
};
