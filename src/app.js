const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publidDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine adn views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publidDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bogdan Ionescu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bogdan Ionescu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text printing',
        title: 'Help page',
        name: 'Bogdan Ionescu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No address sent'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, farecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                description: farecastData.description,
                temperature: farecastData.temperature,
                feelsLike: farecastData.feelslike,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Bogdan Ionescu'
    })
})
 
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Bogdan Ionescu'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})