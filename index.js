var raining = require('./weather/raining.js'),
  ligths = require('./lights/index.js'),
  Repeat = require('repeat'),
  status;

function run() {
  raining.location('Sydney').then(function (result) {
    if (result === true) {
      console.log('raining');
      status = 'rain';
    } else {
      console.log('not raining :)');
      status = 'off';
    }
    ligths.setLights(status, 1);
    ligths.setLights(status, 2);
  });
}

Repeat(run).every(30, 'sec').for(2, 'minutes').start.in(1, 'sec');
