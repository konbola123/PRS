import { initializeApp,applicationDefault } from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";

import express , { json } from "express";

process.env.GOOGLE_APPLICATION_CREDENTIALS;
const app = express();
app.use(express.json());

app.use(function(req,res,next)


{
    res.setHeader("Content-Type", "application/json");
    next();
})

initializeApp({
    credential:applicationDefault(),
    projectId:"",
});

app.post("/send", function (req,res) {

const message = {

    Notification:{
        title:"notif",
        body:"This is a test Notification "
    }
}

});

app.listen(9000, function ()
{
    console.log("SERVER IS STARTED ON PORT 9000");
})
