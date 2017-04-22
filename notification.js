var axios = require("axios");

var msg = [];

exports.subscribe = function (server_key, registration_token, notification_topic) {
    return axios({
        url: "https://iid.googleapis.com/iid/v1/"+registration_token+"/rel/topics/"+notification_topic,
        method: "post",
        headers : {
            "Content-Type":"application/json",
            "Authorization":"key="+server_key
        }
    })
};

exports.publish = function (server_key, notificationTopic) {
    return axios({
        url: "https://fcm.googleapis.com/fcm/send",
        method: "post",
        headers : {
            "Content-Type":"application/json",
            "Authorization":"key="+server_key
        },
        data:{
            "notification": {
                "title": "Scrapbook",
                "body": "Hey, How are you today?",
                "icon": "./favicon.png",
                "click_action": "https://scrapbook-29ef5.firebaseapp.com"
            },
            "to": "/topics/"+notificationTopic
        }
    });
};