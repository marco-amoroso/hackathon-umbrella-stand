var Q = require('q'),
  http = require("http"),
  baseurl = "http://api.wunderground.com/api/855c12b24c18d4d2",
  path = '/q/';


//http://api.wunderground.com/api/855c12b24c18d4d2/conditions/q/CA/San_Francisco.json

function fetchJSON(location, countryCode, type) {
  type = type || 'hourly';
  countryCode = countryCode || 'AU';
  var deferred = Q.defer(), url = baseurl + '/' + type + path + countryCode + '/' + location + '.json';

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
  location: function (city, countryCode) {
    var deferred = Q.defer(), rainyConditions = ['Rain', 'Thunderstorm'];

    Q.allSettled([fetchJSON(city, countryCode, 'conditions'), fetchJSON(city, countryCode)]).then(function (results) {
      var willItRain = false, currentCondition = results[0].value.current_observation.weather;

      rainyConditions.forEach(function (condition) {
        if (currentCondition.indexOf(condition) !== -1) {
          willItRain = true;
        }
      });

      // is it raining in the next couple of hours
      deferred.resolve(willItRain);
    });

    return deferred.promise; 
  }
}
