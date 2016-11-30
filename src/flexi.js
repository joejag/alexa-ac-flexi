'use strict'

var cheerio = require("cheerio")
var ace = require('./aceAuth')

function findFlexi(callback) {
    ace(function(request) {
        request.get('https://arnoldclarkemployee.com/Ace/Attendance/FlexiStatement', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body)
                var statement = $('p[class=full-width-text]').first().text().trim()

                var period = statement.split("\n")[0].trim()
                var periodFrom = period.split('-')[0]
                var periodTo = period.split('-')[1]

                var balance =statement.split("\n")[1].trim()
                var hours = parseInt(balance.split(' ')[1].split(':')[0])
                var minutes = parseInt(balance.split(' ')[1].split(':')[1])

                callback(`You have a balance of ${hours} hours and ${minutes} minutes for the period from the ${periodFrom} to ${periodTo}`)
            } else {
                callback("OH NO - getting flexi - " + response.statusCode)
            }
        })
    })
}

findFlexi(console.log)

module.exports = findFlexi;
