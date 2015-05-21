var raining = require('./weather/raining.js');

raining.location('Sydney').then(function (result) {
  if (result === true) {
    console.log('raining');
  } else {
    console.log('not raining :)');
  }
});
