const request = require('postman-request')

var accessToken = 'pk.eyJ1IjoiYm9nZGFub3ZpY2lpIiwiYSI6ImNrbjZmNnozNzBkamkydW82YnBzOHQxMHoifQ.fLlPaUK6AG61TWgPZH5XUQ'

const geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + accessToken + '&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to lacation services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode