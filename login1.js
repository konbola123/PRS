
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydatabase");


const loginHandler = async (req, res) => {
    const { email , password } = req.body;

   try
   {
      const user = await User.findOne({email,password});

      if(user)
      {
        res.send("Login is Successfully");
        console.log("login is successfully")
      }

      else{
        res.status(401).send("invalid email or password");
      }
      
   }

   catch(error){
    console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');

   }
};

module.exports = { loginHandler }