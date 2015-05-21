var Q = require('q'),
  http = require("http"),
  baseurl = "http://api.wunderground.com/api/855c12b24c18d4d2",
  path = '/q/AU';


//http://api.wunderground.com/api/855c12b24c18d4d2/conditions/q/CA/San_Francisco.json

function fetchJSON(location, type) {
  type = type || 'hourly';
  var deferred = Q.defer(), url = baseurl + '/' + type + path + '/' + location + '.json';

  http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
      deferred.resolve(JSON.parse(body));
    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });

  return deferred.promise;
}

module.exports = {
  location: function (location) {
    var deferred = Q.defer(), rainyConditions = ['Rain', 'Rain Showers', 'Thunderstorm'];

    Q.allSettled([fetchJSON(location, 'conditions'), fetchJSON(location)]).then(function (results) {
      var willItRain = false;

      // is it raining now?
      var currentWeather = results[0].value.current_observation.weather;



      if (rainyConditions.indexOf(currentWeather) !== -1) {
        console.log('its gonna rain');
      }

      //console.log(rainyConditions.indexOf(currentWeather));

      //console.log(results[1].value.hourly_forecast[0].condition);

      // is it raining in the next couple of hours
      deferred.resolve([results[0].value, results[1].value]);
    });

    return deferred.promise; 
  }
}
