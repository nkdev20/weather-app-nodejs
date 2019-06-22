const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const address = process.argv[2];

// console.log(process.argv);
if(!address) {
    console.log('Please provide address');
} else {
    geocode(address, (error, data) => {
        if (error == undefined) {
            console.log(data);
            forecast(data, (error, data) => {
                if (error == undefined) {
                    console.log('Data', data);
                } else {
                    console.log('Error', error);
                }

            })
        } else {
            console.log('Error', error);
        }

    });
}

