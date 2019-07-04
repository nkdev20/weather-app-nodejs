const request = require('request');

const forecast = (data, callback) => {
    const url = 'https://api.darksky.net/forecast/32c9bfd752aa629bbffa3cfeebf9ee6a/' + data.lattitude + ',' + data.longitude;

    request({
        url: url,
        json: true
    }, (err, response) => {
        if (err) {
            callback('unable to connect to weather service api', undefined);
        } else if (response.body.error) {
             callback('Unable to find location', undefined);
        } else {
            callback(undefined, 
                'It is currenlty ' + response.body.currently.temperature + ' and there is ' + response.body.currently.precipProbability + '% probablity of rain'
            );
        }

    });
}

module.exports = forecast;

