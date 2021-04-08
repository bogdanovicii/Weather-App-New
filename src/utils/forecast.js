const request = require('postman-request')
var apiKey = '1edab7ad53358edc5e5c63fb3cf4a123'

const forecast = (latitude, longitude, callback) => {
    var unit = 'm' // Celsius

    var url = 'http://api.weatherstack.com/current?access_key=' + apiKey + '&query=' + latitude + ',' + longitude + '&units=' + unit;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server!')
        } else if (body.error) {
            callback('Unable to find the coordinates!')
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast