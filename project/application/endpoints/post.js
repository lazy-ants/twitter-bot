var Promise = require('promise');
var Twitter = require('twitter');
var parameters = require('../config').parameters;
var T = new Twitter(parameters.twitter);

function activatePOST(app) {
    app.post('/tweets/favorites/create', function (req, res) {
        var params = {
            q: req.body.count || '#twitter',
            count: req.body.count || '10',
            result_type: req.body.result_type || 'recent',
            lang: req.body.lang || 'en'
        };

        var promise = new Promise(function (resolve, reject) {
            // Initiate your search using the above paramaters
            T.get('search/tweets', params, function(err, data, response) {
                // If there is no error, proceed
                if (!err) {
                    // Loop through the returned tweets
                    var returnedTweets = 0;
                    for (var i = 0; i < data.statuses.length; i++) {
                        // Get the tweet Id from the returned data
                        var id = {
                            id: data.statuses[i].id_str
                        };
                        // Try to Favorite the selected Tweet
                        T.post('favorites/create', id, function (err, response) {
                            // If the favorite fails, log the error message
                            if (err) {
                                console.log(err[0].message);
                            } else {
                                // If the favorite is successful, log the url of the tweet
                                var username = response.user.screen_name;
                                var tweetId = response.id_str;
                                console.log('Favorited: ', 'https://twitter.com/' + username + '/status/' + tweetId);
                            }

                            returnedTweets += 1;
                            if (returnedTweets === data.statuses.length) {
                                resolve();
                            }
                        });
                    }
                } else {
                    console.log(err);
                    reject();
                }
            });
        });

        promise.then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(400);
        });
    });
}

module.exports = activatePOST;
