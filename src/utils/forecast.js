
const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/95a017a44a9015a9b00c0d7efaecdd6e/' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to Connect to weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' ' + 'It is currently' + ' ' + response.body.currently.temperature + ' ' + 'degress out. There is a' +' ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast