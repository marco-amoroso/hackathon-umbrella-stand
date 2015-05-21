module.exports = {
  setLights: function (status) {
    var request = require('request'),
      form,
      rainForm = {
        'on': true,
        'bri': 253,
        'hue': 65527,
        'sat': 253
      },
      sunnyForm = {
        'on': true,
        'bri': 253,
        'hue': 10000,
        'sat': 253
      };

    if (status === 'rain') {
      form = rainForm;
    } else {
      form = sunnyForm;
    }

    var url = 'http://192.168.1.204/api/91e0703aceed2a05cba02c792821d8b6/lights/1/state';

    request({url: url, method: 'PUT', json: form}, function (error, response) {
      if (error || response.statusCode !== 200) {
        console.log("Error");
      }
    });
  }
};

