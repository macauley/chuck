var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.post('/', function (req, res) {
    // Fetch a random fact for Chuck!
    request('http://api.icndb.com/jokes/random', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var payload = {
                "response_type": "in_channel",
                "text": JSON.parse(body).value.joke,
            };
            res.status(200).json(payload);
        }
        else {
            res.status(respsonse.statusCode).response;
        }
    });
});

app.post('/thedude', function (req, res) {
    // Fetch a random fact for Big Lebowski!
    request('http://lebowski.me/api/quotes/random', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var markdownQuote = joinlines(data['quote']['lines']);
            var payload = {
                "response_type": "in_channel",
                "text": markdownQuote,
            };
            res.status(200).json(payload);
        }
        else {
            res.status(respsonse.statusCode).response;
        }
    });
});


app.get('/', function (req, res) {
    // Fetch a random fact for Chuck!
    request('http://api.icndb.com/jokes/random', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var payload = {
                "response_type": "in_channel",
                "text": JSON.parse(body).value.joke,
            };
            res.status(200).json(payload);
        }
        else {
            res.status(respsonse.statusCode).response;
        }
    });
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});

var joinlines = function(lines) {
  var ret = []
  lines.forEach(function(line){
    ret.push('*_' + line.character.name '_*' + '\n' + line.text);
  });
  return ret.join('\n\n') + '\n';
};
