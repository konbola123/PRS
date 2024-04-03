const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const PORT = process.env.PORT = 7000;
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const {authschema} = require('./model/user1');
const {loginHandler} = require("./login1");



// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/mydatabase",{

useUnifiedTopology: true

})

const UserSchema = new mongoose.Schema({
     
    fullname:String,
    email:{

        type: String,
    required: true,
    unique: true, // Ensures email is unique
    trim: true,
    lowercase: true, // Converts email to lowercase
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  
        
    },
    password:{
        type: String,
        required: true,
        minlength: 6 // Minimum length of the password
    },

    username:{
        type: String,
    required: true,
    trim: true 
    },

    mobno:{
        type:Number,
        minlength:10
    }

});
const User = mongoose.model('User', UserSchema);

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname + "/registration.html"))

});


app.get("/index1.html",(req,res)=>{

  res.sendFile(path.join(__dirname + "/index1.html"))

})

app.get("/Ask.html",(req,res)=>{
  res.sendFile(path.join(__dirname+"/Ask.html"))
})


app.get("/login.html",(req,res)=>{

  res.sendFile(path.join(__dirname + "/login.html"))

});

app.post("/login",loginHandler);
app.get("/registration.html",(req,res)=>{

  res.sendFile(path.join(__dirname+"/registration.html"))
})

app.get("/form.html",(req,res)=>{

  res.sendFile(path.join(__dirname+"/form.html"))
})

app.get("/about.html",(req,res)=>{

  res.sendFile(path.join(__dirname + "/about.html"))
})

app.get("/home2.html",(req,res)=>{

  res.sendFile(path.join(__dirname + "/home2.html"))
})

app.get("/home3.html",(req,res)=>{

  res.sendFile(path.join(__dirname + "/home3.html"))
})


app.get("/test.html",(req,res)=>{

  res.sendFile(path.join(__dirname + "/test.html"))
})


app.post('/register', async (req, res) => {
    const { username, email, password, fullname, mobno } = req.body;
  
    // Create a new user instance
    const newUser = new User({ username, email, password,fullname,mobno });
  
    // Save the user to the database
   await newUser.save((err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
      } else {
        res.status(200).json({ message: 'User registered successfully' });
      }
    });
  });
  

  const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: String,
  email: {

    type: String,
required: true,
unique: true, // Ensures email is unique
trim: true,
lowercase: true, // Converts email to lowercase
validate: {
  validator: function(v) {
    return /\S+@\S+\.\S+/.test(v);
  },
  message: props => `${props.value} is not a valid email!`
}

    
},
  phone: {
    type:Number,
    minlength:10
},
  birthdate: Date,
  resume: String,
  comments: String
});

const Data = mongoose.model('Data', dataSchema);

  

// Endpoint to receive POST requests
app.post('/submit', async (req, res) => {
  try {
    // Create a new document with the received data
    const newData = new Data({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      birthdate: req.body.birthdate,
      resume: req.body.resume,
      comments: req.body.comments
    });


    // Save the document to MongoDB
    await newData.save();
    
    res.sendFile(path.join(__dirname+"/submit.html"));
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

  


app.listen(PORT,()=>{
    console.log("Server is listening on port 7000");
});