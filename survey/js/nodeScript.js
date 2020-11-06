// import survey from './data.js';
// console.log(survey);

// DIT WERKT
let survey = require('./data.json');
var oogKleur = survey.map(function (el) {return el.oogKleur});

console.log(oogKleur);

// ROBERT UITLEG
// MET SERVER (FATCH)
// console.log('hello world.')

// fetch('data.json')
//   .then(response => response.json())
//   .then(data => parseData(data))

// function parseData(data) {
//   console.log(data)
// }

// ZONDER SERVER
// var deData = data();
// console.log(data);