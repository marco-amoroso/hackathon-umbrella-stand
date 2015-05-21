var raining = require('./weather/raining.js');
var ligths = require('./lights/index.js');
var Repeat = require('repeat');

function run() {
  raining.location('Perth').then(function (result) {
    if (result === true) {
      console.log('raining');
      ligths.setLights('rain');
    } else {
      console.log('not raining :)');
      ligths.setLights('clear');
    }
  });
}

Repeat(run).every(10, 's').for(2, 'minutes').start.in(1, 'sec');
