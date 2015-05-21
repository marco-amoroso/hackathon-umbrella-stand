var ligths = require('./lights/index.js'),
  Repeat = require('repeat'),
  ping = require('ping');

function run() {
  var host = '192.168.1.83';
  ping.sys.probe(host, function (isAlive) {
    var status = isAlive ? 'off' : 'party';
    console.log(status);
    ligths.setLights(status, 2);
  });
}

// function run() {
//   console.log(session);

  // session.pingHost('http://finder.com.au', function (error) {
  //   if (error) {
  //     ligths.setLights('off', 2);
  //   } else {
  //     ligths.setLights('party', 2);
  //   }
  // });
//}

Repeat(run).every(3, 'sec').for(2, 'minutes').start.in(1, 'sec');
