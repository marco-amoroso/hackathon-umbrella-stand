var needABrolly = require('./weather/lib/fetch.js');

needABrolly.location('Sydney').then(function (result) {
   if (result === true) {
   	console.log('raining');
   } else {
   	console.log('not raining tonight');
   }
});
