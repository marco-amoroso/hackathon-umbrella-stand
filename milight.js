//load this wifi box class
var WifiBoxModule = require('./milights/wifibox.js');
var cmd = require('./milights/commands.js');
var raining = require('./weather/raining.js');
var box = new WifiBoxModule("192.168.1.131", 8899);

function check() {
  console.log('checking weather');
  raining.location('Sydney').then(function (result) {
    if (result === true) {
      console.log('It looks like it will rain in the next few hours.');
      box.command(cmd.rgb.hue(170));
      setTimeout(function () {
        box.command(cmd.rgb.on());
      }, 200);
    } else {
      console.log('Looks like it will not rain in the next few hours.');
      box.command(cmd.rgb.off());
    }
  });
}

check();
setInterval(check, (1000 * 60) * 15);
