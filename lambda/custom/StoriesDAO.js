const AWS = require('aws-sdk');
var CONFIG = require('./Configuration');

module.exports = {

    GetStoryParts: function (storyID, callback) {
        console.log('Inside GetStoryParts');

        var docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: CONFIG.PARTS_TABLE,
            KeyConditionExpression: "#StoryID = :ID",

            ExpressionAttributeNames: {
                "#StoryID": "pkStoryID"
            },
            ExpressionAttributeValues: {
                ":ID": storyID
            }
        };
        console.log("params :" + JSON.stringify(params));

        docClient.query(params, function (err, data) {
            var fnResult = {};

            if (err) {
                fnResult.statusCode = 400;
                fnResult.error_description = err;
            } else {
                if (data.Count === 0) {
                    fnResult.statusCode = 400;
                }
                else {

                    fnResult.statusCode = 200;
                    fnResult.storyParts = data;
                }
            }
            console.log("fnResult :" + JSON.stringify(fnResult));
            callback(fnResult);
        });
    },

    GetAllStories: function (callback) {
        console.log('Inside GetAllStories');

        var docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: CONFIG.STORIES_TABLE
        };
        console.log("params :" + JSON.stringify(params));

        docClient.scan(params, function (err, data) {
            var fnResult = {};

            if (err) {
                fnResult.statusCode = 400;
                fnResult.error_description = err;
            } else {
                if (data.Count === 0) {
                    fnResult.statusCode = 400;
                }
                else {

                    fnResult.statusCode = 200;
                    fnResult.stories = data;
                }
            }
            console.log("fnResult :" + JSON.stringify(fnResult));
            callback(fnResult);
        });


    }
}
