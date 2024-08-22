// auth.service.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// Example: authService.login function
async function login(email, password) {
    try {
      const user = await User.findOne({ email });
       if (!user) return 
      //returning user
      return user;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
  
  

async function register(company,name,email,password) {
    try {
       // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user =  new User({company,name,email, password: hashedPassword });
      await user.save();

      //returning user
      return user;
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new Error('Email already exists');
      } else {
        throw error;
      }
    }
  }
  
  module.exports = { login, register };