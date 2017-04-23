'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var axios = require("axios");
var schedule = require('node-schedule');

var notifications = require("./notification.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for reading urlencoded params
app.use(cors());


var server_key = "AAAAt2EKL3U:APA91bHmiWZW71cQ1Th4sunczaC0I9KxwfD67suF_xElz3cHa2UwGjgfR-RI78UhxmKockNsQFKteBTcfvjw4zXKf--6ZYc8isUI1bS1LDhvL4MVAWM2fKu9xhfe97JMuyPkKtDLfJ2c";

var notificationTopic = null;
var jobId = null;

scheduleNotification();


function scheduleNotification() {

  if (jobId !== null) {
    jobId.cancel();
  }

  console.log('Scheduling called');

  jobId = schedule.scheduleJob("0 */30 * * * *", function () {
    console.log('Scheduling running');
    notifications.publish(server_key);
  });
}

/**
 * Call this API from clients to subscribe to notifications.
 */
app.post("/notification/subscribe", function (req, res) {

  var registration_token = req.body.registration_token.trim();
  var notification_topic = req.body.notification_topic.trim();

  notifications.subscribe(server_key, registration_token, notification_topic).then(function (response) {

    console.log("[RESPONSE]: ", registration_token, notification_topic);

    notificationTopic = notification_topic;

    res.status(response.status).json({
      "statusCode": "00",
      "statusText": "Successfully subscribed to " + notification_topic + " notification group."
    });


  }).catch(function (error) {
    console.log("[ERROR]: ", error);
    res.status(response.status).json({
      "statusCode": "01",
      "statusText": error
    });
  });
});
/**
 * Invoke this API from any API client to test notification functionality
 */
app.post("/notification/send", function (req, res) {

  notifications.publish(server_key, notificationTopic).then(function (response) {

    console.log("called from send", server_key, notificationTopic);

    res.status(response.status).json({
      "statusCode": "00",
      "statusText": "Successfully sent notification to " + notificationTopic + " notification group."
    });
  }).catch(function (error) {
    console.log("[ERROR]: ", error);
    res.status(response.status).json({
      "statusCode": "01",
      "statusText": error
    });
  });
});


app.get('/', function (req, res) {
  res.send('Hello World! This is a Scrapbook backend code.')
})

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});