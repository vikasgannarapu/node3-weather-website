const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2bc24a8dfedf2c1302dfc05fef2ff854&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error) {
           callback('unable to connect to the weather service', undefined)
        } else if (body.error) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined,  ' It is currently '+ body.current.temperature + '. It currently feels like ' + body.current.feelslike + '.')
        }

    })
}

module.exports = forecast