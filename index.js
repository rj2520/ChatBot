'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())



// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('Express server is running at port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text
		    //sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
	    }
		// con.connect(function(err) {
		//   if (err) throw err;
		//   console.log("Connected!");
		// });
		// var sql = "INSERT INTO Orders(UID, Time, Content) VALUES(?, ?, ?)";
		// var uid = sender
		// var time = Date.Now()
		// var txt = text
		// con.query(sql, (uid, time, txt), function(err, result){
		// 	if(err) throw err;
		// 	console.log("added");
		// });


    }
    res.sendStatus(200).send("hello");
})

const token = "EAAFV4wUyJZAwBAC9ZANzbez1SqUeQ3a3K9gDyI6SSkxrlhyct42oNCcDE3W4yUPDTQYjqV5AXDfe9IHePmPzZBwC4LRHHQrtbzH1wvCzf1ahXNT5cbxJRqZBeobuOTXcFLPiPtqNvR14IQt8KKG6Xtg3ivBMaZAkhnhT4XFUGhgZDZD"

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

var mysql = require('mysql');

var con = mysql.createConnection({
	host: "chatbot.cgwtow8tax0g.us-east-2.rds.amazonaws.com",
	user: "lyldayu",
	password: "ChatBot9",
	port: "3306",
	database: "ChatBot"
});

con.connect(function(err) {
	if (err)
	{
		console.log("ERROR in connection to DB")
	}
	else
	{
		console.log("Connected!")

	}

});
