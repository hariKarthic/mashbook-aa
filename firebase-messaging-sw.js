
// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

const myFirebaseConfig = {
  apiKey: "AIzaSyBJ7cMU9QFd53uzhv3xBmaXXFw7wT4PB24",
  authDomain: "scrapbook-29ef5.firebaseapp.com",
  databaseURL: "https://scrapbook-29ef5.firebaseio.com",
  projectId: "scrapbook-29ef5",
  storageBucket: "scrapbook-29ef5.appspot.com",
  messagingSenderId: "787607072629"
};

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp(myFirebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationOptions = {
    "body": payload.body,
    "icon": payload.icon,
    "click_action": payload.click_action
  };

  return self.registration.showNotification(payload.title,
    notificationOptions);
});
// [END background_handler]
