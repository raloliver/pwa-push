importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': "652963141904"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    console.log('That where your message :' + payload);
    return self.registration.showNotification({}, {});
})