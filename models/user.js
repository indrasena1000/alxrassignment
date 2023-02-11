const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    
    password: {
      type: String,
      minlength: 6
    },
    token:{
        type:String
    }
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;