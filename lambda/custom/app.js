'use strict';
var AWS = require("aws-sdk");
const Alexa = require('alexa-sdk');
const math = require('math');
var filter = require('lodash.filter');

var CONFIG = require('./Configuration');
var storiesDAO = require('./StoriesDAO');


const APP_ID = "amzn1.ask.skill.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // TODO replace with your app ID (OPTIONAL)

// TODO replace messages with your customized messages
const languageString = {
    'en': {
        'translation': {
            'START_UNHANDLED': 'Say restart to start a new Journey with Mariam.',
            'ASK_MESSAGE_START': 'Would you like to start playing?',
            'REPEAT_QUESTION_MESSAGE': 'To repeat the last question, say, repeat. ',
            'STOP_MESSAGE': 'Would you like to keep playing? Say Done to end the journey or Say Continue to spend more time with Mariam ',
            'HELP_MESSAGE': 'Mariam is smart girl who love to learn new things and always accept challenges ' +
                            'She needs help from her friends to pass any challenge she faces ' +
                            'You are one of Mariam friends. Please help her by giving her correct answers ' +
                            'for her challenges ' +
                            'To start a new journey at any time, say, start game. ',
            'HELP_REPROMPT': 'Mariam is smart girl who love to learn new things and always accept challenges ' +
                             'She needs help from her friends to pass any challenge she faces ' +
                            'You are one of Mariam friends. Please help her by giving her correct answers ' +
                            'for her challenges ' +
                            'To start a new journey at any time, say, start game. ',
            'NO_MESSAGE': 'Ok, we\'ll play another time. Goodbye!',
            'CANCEL_MESSAGE': 'Ok, let\'s play again soon.',
            'HELP_UNHANDLED': 'Say Done to end the journey or Say Continue to spend more time with Mariam.',
            'ANSWER_WRONG_MESSAGE': ' is wrong. '
        }
    }
};

const STORY_STATES = {
    START: '_STARTMODE', //Welcome & choose story in random way.
    INSIDE_STORY: '_INSIDE_STORY', //Reading Stories Parts.
    HELP: '_HELPMODE', // The user is asking for help.
};

exports.handler = (event, context, callback) => {
    try {

        console.log('Received event:', JSON.stringify(event));
        console.log('Received context:', JSON.stringify(context));

        const alexa = Alexa.handler(event, context);
        alexa.appId = APP_ID;

        // To enable string internationalization (i18n) features, set a resources object.
        alexa.resources = languageString;
        alexa.registerHandlers(newSessionHandlers, startStateHandlers, insideStoryStateHandlers, helpStateHandlers);
        alexa.execute();
    }
    catch (e) {
        context.fail("Exception: " + e);
    }
};

const newSessionHandlers = {
    'LaunchRequest': function () {
        console.log('Inside newSessionHandlers - LaunchRequest fn');
        this.handler.state = STORY_STATES.START;
        this.emitWithState('StartStory', true);
    },
    'NewSession': function () {
        console.log('Inside newSessionHandlers - LaunchRequest fn');
        this.handler.state = STORY_STATES.START;
        this.emitWithState('StartStory', true);
    },
    'AMAZON.StartOverIntent': function () {
        console.log('Inside newSessionHandlers - AMAZON.StartOverIntent fn');
        this.handler.state = STORY_STATES.START;
        this.emitWithState('StartStory', true);
    },
    'AMAZON.HelpIntent': function () {
        console.log('Inside newSessionHandlers - AMAZON.HelpIntent fn');
        this.handler.state = STORY_STATES.HELP;
        this.emitWithState('helpTheUser', true);
    },
    'Unhandled': function () {
        console.log('Inside newSessionHandlers - Unhandled fn');
        const speechOutput = this.t('START_UNHANDLED');
        this.emit(':ask', speechOutput, speechOutput);
    },
};

const startStateHandlers = Alexa.CreateStateHandler(STORY_STATES.START, {
    'StartStory': function () {
        console.log('Inside startStateHandlers - StartStory fn');

        storiesDAO.GetAllStories(
            (function (getAllStoriesResponse)
            {
                console.log('getAllStoriesResponse:', JSON.stringify(getAllStoriesResponse));

                if (getAllStoriesResponse.statusCode === 200)
                {
                    var stories = getAllStoriesResponse.stories.Items;
                    var randomVar = math.random();

                    var StoryID = math.floor( randomVar * getAllStoriesResponse.stories.Count) + 1;
                    console.log('Story ID:' + StoryID);

                    var storyInfo = filter(stories, { 'pkStoryID': StoryID })[0];
                    console.log('storyInfo:', JSON.stringify(storyInfo));

                    storiesDAO.GetStoryParts(StoryID,
                        (function (getAllStoryPartsResponse)
                        {
                            console.log('getAllStoryPartsResponse:', JSON.stringify(getAllStoryPartsResponse));

                            if (getAllStoryPartsResponse.statusCode === 200)
                            {
                                var storyParts = getAllStoryPartsResponse.storyParts.Items;
                                var firstStoryPart = filter(storyParts, { 'skPartID': storyInfo.firstPartID })[0];
                                console.log('firstStoryPart:', JSON.stringify(firstStoryPart));

                                preparePart.call(this, firstStoryPart);
                            }

                        }).bind(this)
                    );
                }
            }).bind(this)
        );
    },

    'Unhandled': function () {
        console.log('Inside newSessionHandlers - Unhandled fn');
        const speechOutput = this.t('START_UNHANDLED');
        this.emit(':ask', speechOutput, speechOutput);
    },
});

const helpStateHandlers = Alexa.CreateStateHandler(STORY_STATES.HELP, {

    'helpTheUser': function (newStory) {
        console.log('Inside helpStateHandlers - helpTheUser fn');

        const askMessage = newStory ? this.t('ASK_MESSAGE_START') : this.t('REPEAT_QUESTION_MESSAGE') + this.t('STOP_MESSAGE');
        const speechOutput = this.t('HELP_MESSAGE') + askMessage; //this.t('HELP_MESSAGE', GAME_LENGTH) + askMessage;
        const repromptText = this.t('HELP_REPROMPT') + askMessage;
        this.emit(':ask', speechOutput, repromptText);
    },

    'AMAZON.RepeatIntent': function () {
        console.log('Inside helpStateHandlers - AMAZON.RepeatIntent fn');

        storiesDAO.GetStoryParts(this.attributes.StoryID,
            (function (getAllStoryPartsResponse) {
                if (getAllStoryPartsResponse.statusCode === 200) {
                    var storyParts = getAllStoryPartsResponse.storyParts.Items;

                    console.log('PartID: ' + this.attributes.StoryPartID);
                    var storyPart = filter(storyParts, { 'skPartID': this.attributes.StoryPartID })[0];
                    console.log('storyPart:', JSON.stringify(storyPart));

                    preparePart.call(this, storyPart);
                }
            }).bind(this)
        );
    },

    'AMAZON.HelpIntent': function () {
        console.log('Inside helpStateHandlers - AMAZON.HelpIntent fn');

        const newStory = !(this.attributes['speechOutput'] && this.attributes['repromptText']);
        this.emitWithState('helpTheUser', newStory);
    },

    'ContinueIntent': function () {
        console.log('Inside helpStateHandlers - AMAZON.YesIntent fn');

        if (this.attributes['speechOutput'] || this.attributes['repromptText']) {
            this.handler.state = STORY_STATES.HELP;
            this.emitWithState('AMAZON.RepeatIntent');
            //this.emitWithState('AnswerIntent', false);
        } else {
            this.handler.state = STORY_STATES.START;
            this.emitWithState('StartGame', false);
        }
    },
    'AMAZON.StartOverIntent': function () {
        console.log('Inside helpStateHandlers - AMAZON.StartOverIntent fn');

        this.handler.state = STORY_STATES.START;
        this.emitWithState('StartStory', false);
    },

    'DoneIntent': function () {
        console.log('Inside helpStateHandlers - AMAZON.NoIntent fn');

        const speechOutput = this.t('NO_MESSAGE');
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        console.log('Inside helpStateHandlers - AMAZON.StopIntent fn');

        const speechOutput = this.t('STOP_MESSAGE');
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        console.log('Inside helpStateHandlers - AMAZON.CancelIntent fn');

        this.emit(':tell', this.t('CANCEL_MESSAGE'));
    },

    'Unhandled': function () {
        console.log('Inside helpStateHandlers - Unhandled fn');

        const speechOutput = this.t('HELP_UNHANDLED');
        this.emit(':ask', speechOutput, speechOutput);
    },
    'SessionEndedRequest': function () {
        console.log('Inside helpStateHandlers - SessionEndedRequest fn');
        console.log('Session ended in help state: ${this.event.request.reason}');
    },

});

const insideStoryStateHandlers = Alexa.CreateStateHandler(STORY_STATES.INSIDE_STORY, {

    'AnswerIntent': function () {
        console.log('Inside insideStoryStateHandlers - AnswerIntent fn');

        storiesDAO.GetStoryParts(this.attributes.StoryID,
            (function (getAllStoryPartsResponse) {
                if (getAllStoryPartsResponse.statusCode === 200) {
                    var storyParts = getAllStoryPartsResponse.storyParts.Items;

                    console.log('PartID: ' + this.attributes.StoryPartID );
                    var storyPart = filter(storyParts, { 'skPartID': this.attributes.StoryPartID })[0];
                    console.log('storyPart:', JSON.stringify(storyPart));
                    //var storyPart = getAllStoryPartsResponse.storyParts.getStory(this.attributes.storyPartID);

                    checkPartResponse.call(this, storyParts, storyPart);
                }
            }).bind(this)
        );
    },
    'DontKnowIntent': function () {
        console.log('Inside insideStoryStateHandlers - DontKnowIntent fn');

        storiesDAO.GetStoryParts(this.attributes.StoryID,
            (function (getAllStoryPartsResponse) {
                if (getAllStoryPartsResponse.statusCode === 200) {
                    var storyParts = getAllStoryPartsResponse.storyParts.Items;
                    var storyPart = filter(storyParts, { 'skPartID': this.attributes.StoryPartID })[0];
                    console.log('storyPart:', JSON.stringify(storyPart));

                    prepareHint.call(this, storyPart, "");
                }
            }).bind(this)
        );
    },
    'AMAZON.StartOverIntent': function () {
        console.log('Inside insideStoryStateHandlers - AMAZON.StartOverIntent fn');

        this.handler.state = STORY_STATES.START;
        this.emitWithState('StartStory', false);
    },
    'AMAZON.RepeatIntent': function () {
        console.log('Inside insideStoryStateHandlers - AMAZON.RepeatIntent fn');

        storiesDAO.GetStoryParts(this.attributes.StoryID,
            (function (getAllStoryPartsResponse) {
                if (getAllStoryPartsResponse.statusCode === 200) {
                    var storyParts = getAllStoryPartsResponse.storyParts.Items;
                    var storyPart = filter(storyParts, { 'skPartID': this.attributes.StoryPartID })[0];
                    console.log('storyPart:', JSON.stringify(storyPart));

                    preparePart.call(this, storyPart);
                }
            }).bind(this)
        );
    },
    'AMAZON.HelpIntent': function () {
        console.log('Inside insideStoryStateHandlers - AMAZON.HelpIntent fn');

        this.handler.state = STORY_STATES.HELP;
        this.emitWithState('helpTheUser', false);
    },
    'AMAZON.StopIntent': function () {
        console.log('Inside insideStoryStateHandlers - AMAZON.StopIntent fn');

        this.handler.state = STORY_STATES.HELP;
        const speechOutput = this.t('STOP_MESSAGE');
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        console.log('Inside insideStoryStateHandlers - AMAZON.CancelIntent fn');

        this.emit(':tell', this.t('CANCEL_MESSAGE'));
    },
    'Unhandled': function () {
        console.log('Inside insideStoryStateHandlers - Unhandled fn');

        storiesDAO.GetStoryParts(this.attributes.StoryID,
            (function (getAllStoryPartsResponse) {
                if (getAllStoryPartsResponse.statusCode === 200) {
                    var storyParts = getAllStoryPartsResponse.storyParts.Items;
                    var storyPart = filter(storyParts, { 'skPartID': this.attributes.StoryPartID })[0];
                    console.log('storyPart:', JSON.stringify(storyPart));

                    prepareHint.call(this, storyPart, "");
                }
            }).bind(this)
        );
    },
    'SessionEndedRequest': function () {
        console.log('Inside insideStoryStateHandlers - SessionEndedRequest fn');
        console.log('Session ended state: ${this.event.request.reason}');
    },

});



function checkPartResponse( storyPartsArray, currentStoryPart )
{
    console.log('Inside checkPartResponse fn');

    var partResponse = getSlotValue(this.event.request.intent, currentStoryPart.targetAnswerType);

    if (currentStoryPart.partType === CONFIG.CHOICE_PART) {
        console.log("option1Answer : " + currentStoryPart.option1Answer.toUpperCase());
        console.log("option2Answer : " + currentStoryPart.option2Answer.toUpperCase());
        console.log("partResponse : " + partResponse.toUpperCase());

        if (partResponse.toUpperCase() === currentStoryPart.option1Answer.toUpperCase()) {
            var storyPart = filter(storyPartsArray, { 'skPartID': currentStoryPart.option1PartID })[0];
            console.log('option1Story:', JSON.stringify(storyPart));
            preparePart.call(this, storyPart ); //Option 1 seleted
        }
        else if (partResponse.toUpperCase() === currentStoryPart.option2Answer.toUpperCase() ) {
            var storyPart = filter(storyPartsArray, { 'skPartID': currentStoryPart.option2PartID })[0];
            console.log('option2Story:', JSON.stringify(storyPart));
            preparePart.call(this, storyPart);//Option 2 seleted
        }
        else {
            prepareHint.call(this, currentStoryPart, partResponse);//wrong selection
        }
    }
    else {
        console.log("targetAnswer : " + currentStoryPart.targetAnswer.toUpperCase());
        console.log("partResponse : " + partResponse.toUpperCase());

        if (partResponse.toUpperCase() === currentStoryPart.targetAnswer.toUpperCase()) {
            var storyPart = filter(storyPartsArray, { 'skPartID': currentStoryPart.targetAnswerNextPart })[0];
            console.log('targetAnswerPart:', JSON.stringify(storyPart));
            preparePart.call(this, storyPart);//correct answer move to next part
        }
        else {
            prepareHint.call(this, currentStoryPart, partResponse);//wrong answer
        }
    }

}

function preparePart(storyPart)
{
    console.log('preparePart fn');
    console.log('storyPart:', JSON.stringify(storyPart));

    speakToUser.call(this, storyPart.pkStoryID, storyPart.skPartID, storyPart.lastPart, storyPart.partType, 0, storyPart.repromptText, storyPart.speechOutput, storyPart.cardTitle, storyPart.cardContent, storyPart.smallImageUrl, storyPart.largeImageUrl);
}

function prepareHint(storyPart , userWrongAnswer ) {
    console.log('prepareHint fn');
    console.log('StoryPart:', JSON.stringify(storyPart));

    if (userWrongAnswer !== "")
        userWrongAnswer += this.t('ANSWER_WRONG_MESSAGE') ;

    if (this.attributes && this.attributes.NofWrongAnswers && this.attributes.NofWrongAnswers > 0) {
        this.attributes.NofWrongAnswers++
    }
    else
        this.attributes.NofWrongAnswers = 1;

    speakToUser.call(this, storyPart.pkStoryID, storyPart.skPartID, false, storyPart.partType, this.attributes.NofWrongAnswers, userWrongAnswer + storyPart.hintRepromptText, userWrongAnswer + storyPart.hintSpeechOutput, storyPart.hintCardTitle, storyPart.hintCardContent, storyPart.hintCardSmallImageUrl, storyPart.hintCardLargeImageUrl);
}

function speakToUser(storyID, storyPartID, lastPart, partType, nofWrongAnswers, repromptText, speechOutput, cardTitle, cardContent, smallImageUrl, largeImageUrl)
{
    console.log('speakToUser fn');

    Object.assign(this.attributes, {
        'speechOutput': speechOutput,
        'repromptText': repromptText,
        'StoryID': storyID,
        'StoryPartID': storyPartID,
        'NofWrongAnswers': nofWrongAnswers
    });

    var imageObj = {};
    if (smallImageUrl !== " ") {
        imageObj.smallImageUrl = smallImageUrl;
    }

    if (largeImageUrl !== " ") {
        imageObj.largeImageUrl = largeImageUrl;
    }

    this.handler.state = STORY_STATES.INSIDE_STORY;

    if ( !lastPart && smallImageUrl !== " ")
        this.emit(':askWithCard', speechOutput, repromptText, cardTitle, cardContent, imageObj);
    else if ( !lastPart && smallImageUrl === " ")
        this.emit(':ask', speechOutput, repromptText, cardTitle, cardContent);
    if ( lastPart && smallImageUrl !== " ")
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    else
        this.emit(':tell', speechOutput, cardTitle, cardContent);
}

function getSlotValue(intent, answerType) {
    console.log('getSlotValue fn');
    console.log('intent:', JSON.stringify(intent));
    console.log('answerType:' + answerType);
    var answerValue = "";

    switch (answerType)
    {
        case CONFIG.NUMBER_INTENT:
            if ( intent && intent.slots && intent.slots.answer_number && intent.slots.answer_number.value && !isNaN(parseInt(intent.slots.answer_number.value)) ){
                answerValue = intent.slots.answer_number.value;
            }
            break;
        case CONFIG.STRING_INTENT:
            if (intent && intent.slots && intent.slots.answer_string && intent.slots.answer_string.value) {
                answerValue = intent.slots.answer_string.value;
            }
            break;

        case CONFIG.COUNTRY_INTENT:
            if (intent && intent.slots && intent.slots.answer_country && intent.slots.answer_country.value ) {
                answerValue = intent.slots.answer_country.value;
            }
            break;

        case CONFIG.CITY_IN_EUROPE_INTENT:
            if (intent && intent.slots && intent.slots.answer_europe_city && intent.slots.answer_europe_city.value) {
                answerValue = intent.slots.answer_europe_city.value;
            }
            break;

        case CONFIG.CITY_IN_US_INTENT:
            if (intent && intent.slots && intent.slots.answer_us_city && intent.slots.answer_us_city.value) {
                answerValue = intent.slots.answer_us_city.value;
            }
            break;

        case CONFIG.COLOR_INTENT:
            if (intent && intent.slots && intent.slots.answer_color && intent.slots.answer_color.value) {
                answerValue = intent.slots.answer_color.value;
            }
            break;

        case CONFIG.ANIMAL_INTENT:
            if (intent && intent.slots && intent.slots.answer_animal && intent.slots.answer_animal.value) {
                answerValue = intent.slots.answer_animal.value;
            }
            break;

        default:
            break;
    }

//// TODO: other types you need to support
/*
{answer_actor}
{answer_animal}
{answer_artist}
{answer_athlete}
{answer_author}
{answer_book}
{answer_color}
{answer_country}
{answer_device}
{answer_fiction}
{answer_landmark}
{answer_month}
{answer_professional}
{answer_room}
{answer_us_city}
{answer_europe_city}
{answer_number}
{answer_string}
*/

    return answerValue;
}
