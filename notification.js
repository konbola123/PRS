const admin = require('firebase-admin');
const express = require("express");
const app = express();



// Initialize Firebase Admin SDK
const serviceAccount = require('./py.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get the registration token from the client (device)
const registrationToken = '1022456117584';

// Notification payload
const payload = {
  notification: {
    title: 'Hello from Node.js',
    body: 'This is a Firebase Cloud Messaging notification!',
  }
};

// Send a message to the device corresponding to the provided registration token
admin.messaging().sendToDevice(registrationToken, payload)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });

  app.listen(9000,(req,res)=>{

    console.log("the port is running on server 9000")
  })