var ligths = require('./lights/index.js'),
  Repeat = require('repeat'),
  ping = require('ping');

function run() {
  var host = '192.168.1.83';
  var lightId = 2;
  ping.sys.probe(host, function (isAlive) {
    var status = isAlive ? 'off' : 'party';
    console.log(status);
    ligths.setLights(status, lightId);
  });
}

Repeat(run).every(3, 'sec').for(2, 'minutes').start.in(1, 'sec');
