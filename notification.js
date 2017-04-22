var axios = require("axios");

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
                "title": "Photo Journal",
                "body": "Take some time out to take a selfie",
                "icon": "./assets/journal-icon.png",
                "click_action": "http://localhost:4200/gallery"
            },
            "to": "/topics/"+notificationTopic
        }
    });
};