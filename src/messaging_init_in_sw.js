
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
    apiKey: `{process.env.APIKEY}`,
    authDomain: `{process.env.AUTHDOMAIN}`,
    projectId: `{process.env.PROJECTID}`,
    storageBucket: `{process.env.STORAGEBUCKET}`,
    messagingSenderId: `{process.env.MESSAGINGSENDERID}`,
    appId: `{process.env.APPID}`,
    measurementId: `{process.env.MEASUREMENTID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
getToken(messaging, { vapidKey:`{process.env.VAPIDKEY}` }).then((token) => {
    if (token) {
        console.log("TOken", token);
    } else {
        console.log("cant get token");
    }
});


function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }else{
            console.log("acess denied");
        }
    })
};

requestPermission();
