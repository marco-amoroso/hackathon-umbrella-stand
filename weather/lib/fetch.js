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
    var deferred = Q.defer();

    Q.allSettled([fetchJSON(location), fetchJSON(location, 'conditions')]).then(function (results) {

      deferred.resolve([results[0].value, results[1].value]);
    });

    return deferred.promise; 
  }
}
