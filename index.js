'use strict'

var APP_ID =  undefined;

var AlexaSkill = require('./src/AlexaSkill')
var flexiBalance = require('./src/flexi')

var AcFlexiIntent = function () {
    AlexaSkill.call(this, APP_ID)
}

AcFlexiIntent.prototype = Object.create(AlexaSkill.prototype);

function tell(response, message) {
  response.tellWithCard(message, message, message)
}

AcFlexiIntent.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    flexiBalance(function(message) { tell(response, message) })
}

AcFlexiIntent.prototype.intentHandlers = {
    "AcFlexiIntent": function (intent, session, response) {
      flexiBalance(tell)
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say flexi to me!", "You can say flexi to me!")
    }
}

AcFlexiIntent.prototype.constructor = AcFlexiIntent
AcFlexiIntent.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {}
AcFlexiIntent.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {}

exports.handler = function (event, context) {
    var flexiBalance = new AcFlexiIntent()
    flexiBalance.execute(event, context)
}
