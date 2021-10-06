// dailyStatsV2
//
// Retrieves json file for use in state dashboard
//
const fetch = require('node-fetch')

module.exports = function() {
  let dataDomain = 'https://files.covid19.ca.gov/data/';
    return new Promise((resolve, reject) => {
    fetch(dataDomain+'daily-stats-v2.json')
    .then(res => res.json())
    .then(json => {
        resolve(json);
    });
  });
};




