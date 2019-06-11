const request = require('request');

const url = 'https://api.darksky.net/forecast/32c9bfd752aa629bbffa3cfeebf9ee6a/37.8267,-122.4233';

request({ url : url, json:true}, (err, response) => {
    // console.log(response.body.currently)

    console.log('It is currenlty ' + response.body.currently.temperature + ' and there is ' + response.body.currently.precipProbability+ '% probablity of rain') ;
});