var ligths = require('./lights/index.js'),
  Repeat = require('repeat'),
  ping = require('ping');

var Player = require('player');
var player = new Player('./mp3/song.mp3');
var playing = false;

function run() {
  var host = '192.168.1.83';
  var lightId = 2;

  ping.sys.probe(host, function (isAlive) {
    if (!playing && !isAlive) {
      player.play();
      ligths.setLights('party', 1);
      ligths.setLights('party', 2);
      ligths.setLights('party', 3);
      playing = true;
      console.log('playing!');
    } else if (isAlive && playing) {
      player.stop();
      ligths.setLights('off', 1);
      ligths.setLights('off', 2);
      ligths.setLights('off', 3);
      console.log('stopped!');
    } else {
      console.log('waiting...');
    }

  });
}

Repeat(run).every(3, 'sec').for(2, 'minutes').start.in(1, 'sec');
