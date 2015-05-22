function buildForm(status) {
  var form,
    offForm = {
      'on': false
    },
    rainForm = {
      'on': true,
      'bri': 253,
      'hue': 65527,
      'sat': 253
    },
    partyForm = {
      'on': true,
      'effect': 'colorloop',
      'alert': 'lselect'
    };

  if (status === 'rain') {
    form = rainForm;
  } else if (status === 'party') {
    form = partyForm;
  } else { //if (status === 'off') {
    form = offForm;
  }

  return form;
}

module.exports = {
  setLights: function (status, lightId) {
    status = status || 'clear';
    lightId = lightId || 1;

    var request = require('request');
    var url = 'http://192.168.1.204/api/91e0703aceed2a05cba02c792821d8b6/lights/' + lightId;
    var form = buildForm(status);

    request({url: url + '/state', method: 'PUT', json: form}, function (error, response) {
      if (error || response.statusCode !== 200) {
        console.log("Error");
      }
    });
  }
};

