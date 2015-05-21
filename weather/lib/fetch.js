var Q = require('q'),
  http = require("http"),
  baseurl = "http://api.wunderground.com/api/855c12b24c18d4d2",
  path = '/q/';


//http://api.wunderground.com/api/855c12b24c18d4d2/conditions/q/CA/San_Francisco.json

function fetchJSON(location, countryCode, type) {
  type = type || 'hourly';
  countryCode = countryCode || 'AU';
  var deferred = Q.defer(),
    url = baseurl + '/' + type + path + countryCode + '/' + location + '.json';

  http.get(url, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      deferred.resolve(JSON.parse(body));
    });
  }).on('error', function (e) {
    console.log("Got error: ", e);
  });

  return deferred.promise;
}

function checkForRain(forecast) {
  var willItRain = false, rainyConditions = ['Rain', 'Thunderstorm', 'Drizzle', 'Snow', 'Hail', 'Squalls'];

  rainyConditions.forEach(function (condition) {
    if (forecast.indexOf(condition) !== -1) {
      willItRain = true;
    }
  });

  return willItRain;
}

module.exports = {
  location: function (city, countryCode) {
    var deferred = Q.defer();

    Q.allSettled([fetchJSON(city, countryCode, 'conditions'), fetchJSON(city, countryCode)]).then(function (results) {
      var i, willItRain = false,
        currentCondition = results[0].value.current_observation.weather;

      if (checkForRain(currentCondition) === true) {
        willItRain = true;
      }

      // check if it's raining... if it is don't bother with the forecast
      if (willItRain === false) {
        // check the forecast results... for the next few hours
        for (i = 0; i < 2; i = i + 1) {
          if (checkForRain(results[1].value.hourly_forecast[i].condition) === true) {
            willItRain = true;
          }
        }
      }

      // is it raining in the next couple of hours
      deferred.resolve(willItRain);
    });

    return deferred.promise;
  }
};
