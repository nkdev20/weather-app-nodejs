const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Goa',  (error, data) => {
    if(error == undefined) {
        console.log(data);
        forecast(data, (error, data) => {
            if(error == undefined) {
                console.log('Data', data);
            } else {
                console.log('Error', error);
            }

        })
    } else {
        console.log('Error', error);
    }

});
