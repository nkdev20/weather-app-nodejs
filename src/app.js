const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Set up handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name : 'nk'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        message: "this is helpul text",
        title: 'Help',
        name: 'nk'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'nk'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: 'You should provide address'
        });
    }
    geocode(req.query.address, (error, {
                lattitude,
                longitude,
                location
            } = {}) => {
        if (error == undefined) {
            forecast({
                        lattitude,
                        longitude,
                        location
                    }, (error, data) => {
                if (error == undefined) {
                    return res.send({
                        lattitude,
                        longitude,
                        location,
                        'forecast': data
                    });
                } else {
                    return res.send({
                        'error': error
                    });
                }
            })
        } else {
            return res.send({
                'error': error
            });
        }

    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'nk',
        'errorMessage': 'Help article not found'

    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            Error: 'You should provide search term'
        });
    }
    console.log(req.query);
    return res.send({
        products:[]
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'nk',
        'errorMessage': 'Page Not found'

    });
});




app.listen(port, () => {
    console.log('Server is up')
});