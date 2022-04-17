"use strict";

// chargement du module movies_sql
let movies = require('./movies_sql_template');

// chargement d'une liste de films, devrait afficher "true"
console.log("Chargement des films", movies.load('movies.json'));

// affichage du nombre de films chargés, devrait être 247
console.log('Nombre de films :', movies.list().length);

// affichage d'un film, devrait être "The god father"
console.log("Film d'indice 1 :", movies.read(1));

// affichage du film d'indice 42 dans la liste, devrait être "The Pianist"
console.log("Film d'indice 42 dans la liste :", movies.list()[42]);

// création d'un nouveau film
let id = movies.create('PARASITE', 2019, 'Song Kang Ho, Lee Sun Kyun, Yeo-Jeong Jo, Choi Woo-sik', 'A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.', 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg');

// devrait afficher 247
console.log('Identifiant du film créé :', id);

// devrait afficher le contenu du film précédemment ajouté
let movie = movies.read(id);
console.log("Film qui vient d'être ajouté :", movie);

// mise à jour du film, devrait afficher "true"
console.log("Mise à jour du film :", movies.update(id, 'Parasite', 1982, movie.actors, movie.plot, movie.poster));

// mise à jour d'un film qui n'existe pas, devrait afficher "false"
console.log("Mise à jour du film (n'existe pas) :", movies.update(999, 'Parasite', 1982, movie.actors, movie.plot, movie.poster));

// suppression du film, devrait afficher "true"
console.log("Suppression du film :", movies.delete(id));

// suppression d'un film qui n'existe pas, devrait afficher "false"
console.log("Suppression du film (n'existe pas) :", movies.delete(999));

// affichage d'un film qui n'existe pas (devrait afficher "null")
console.log("Affichage d'un film qui n'existe pas :", movies.read(999));

// sauvegarde des films au format json
console.log(movies.save('movies2.json'));

