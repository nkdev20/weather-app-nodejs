const request = require('request');

const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlraGlsa2RldjIwIiwiYSI6ImNqd3FqdHd1azI4bWIzeW5zY2loeG1uaGsifQ.bI9yVxKbWR6Fp7TNuO6Cxg';

    request({
        'url': mapboxUrl,
        json: true
    }, (err, response) => {

        if (err) {
            callback('unable to connect to mapbox api', undefined);
        } else if (response.body.features.length === 0) {
            callback('Invalid location', undefined);
        } else {
            callback(undefined, {
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }

    })
}

module.exports = geocode;