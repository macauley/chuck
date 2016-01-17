var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.post('/', function (req, res) {
	var payload = {
		"response_type": "in_channel",
		"text": "Chuck Norris fact generator!",
		"attachments": [
			{
				"text": "Chuck Norris is the fucking man!"
			}
		]
	};

	res.status(200).json(payload); 
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});
