var axios = require("axios");

var msg = [];

exports.subscribe = function (server_key, registration_token, notification_topic) {
    return axios({
        url: "https://iid.googleapis.com/iid/v1/" + registration_token + "/rel/topics/" + notification_topic,
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=" + server_key
        }
    })
};

exports.publish = function (server_key) {

    let generateTopicWithOffset = (offset) => {
        const prefix = (offset < 0) ? "__" : "_";
        const postfix = Math.abs(offset);
        return `scrap_book${prefix}${postfix}`;
    };

    let getTargetTopic = (time) => {
        const notificationTime = time.split(':');
        let hr = 0;
        let min = 0;
        if (notificationTime.length > 0) {
            hr = parseInt(notificationTime[0]);
            hr = isNaN(hr) ? 0 : hr;
        }
        if (notificationTime.length > 1) {
            min = parseInt(notificationTime[1]);
            min = isNaN(min) ? 0 : min;
        }

        const date = new Date();
        const hrUtc = date.getUTCHours();
        const minUtc = date.getUTCMinutes();

        const hrDiff = hrUtc - hr;
        const minDiff = minUtc - min;

        // console.log(hr, min, hrUtc, minUtc, hrDiff, minDiff);

        let possibleOffset = (hrDiff * 60) + minDiff;
        possibleOffset = possibleOffset - (possibleOffset % 30);
        return generateTopicWithOffset(possibleOffset);
    };

    let notificationTopic = getTargetTopic("17:30");
    console.log('notificationTopic', notificationTopic);


    return axios({
        url: "https://fcm.googleapis.com/fcm/send",
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key=" + server_key
        },
        data: {
            "notification": {
                "title": "Scrapbook",
                "body": "Hey, How are you today?",
                "icon": "./favicon.png",
                "click_action": "https://scrapbook-29ef5.firebaseapp.com"
            },
            "to": "/topics/" + notificationTopic
        }
    });
};