const request = require('request')

//////////Geo Coading //////////



const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmFyaGFuMTIxIiwiYSI6ImNrMmRpbjd4dDNmNDgzbHBoNnd5M3A0Z2sifQ.ELcrdTFg81kYX1k_-39B1g&limit=1'
    request({ url: geocodeUrl, json: true }, (error, response) => {

        if (error) {
            callback('unable to connect ', undefined)
        }
        else if (response.body.features.length == 0) {
            callback('unable to find location try another location ', undefined)
        }
        else {
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name

            callback(undefined, { latitude, longitude, location })
        }

    })
}

module.exports = geocode
