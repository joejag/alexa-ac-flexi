'use strict'

var request = require('request')
var cheerio = require("cheerio")

var baseRequest = request.defaults({
    headers: {
        'User-Agent': 'JoeWrightAlexaApp'
    },
    followRedirect: true,
    followAllRedirects: true,
    jar: true
})

function postCredentails(encryptedRequestData, callback) {
    baseRequest.post('https://arnoldclarkemployee.com/EmsAuthenticationPortal/Login/GetLoginResponse', {
            form: {
                isPassthrough: false,
                employeeId: process.env.AC_ID,
                monthOfBirth: process.env.AC_MONTH,
                password: process.env.AC_PASSWORD,
                encryptedRequestData: encryptedRequestData
            }
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(baseRequest)
            } else {
                console.log("OH NO - logging in - " + response.statusCode)
            }
        })
}

function login(callback) {
    baseRequest.get('https://arnoldclarkemployee.com', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body)
            var encryptedRequestData = $('input[name=encryptedRequestData]').attr('value')
            postCredentails(encryptedRequestData, callback)
        } else {
            console.log("OH NO - log in page - " + response.statusCode)
        }
    })
}

module.exports = login;
