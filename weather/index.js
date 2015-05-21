var fetch = require('./lib/fetch.js');

fetch.location('Sydney').then(function (result) {
   // if it's going to 
   console.log(result[0]);
   console.log(result[1]);
});


