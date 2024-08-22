// auth.routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authService = require('../services/auth.service');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { company,name,email, password } = req.body;
    const user = await authService.register(company,name,email,password);
    const token = jwt.sign({user},process.env.JWT_TOKEN_KEY, {expiresIn:"1h"})
    res.status(200).json(token);
    console.log(token);
  } catch (error) {
    console.error(error);
    if (error.message === 'Email already exists') {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

router.post('/login', async (req, res) => {
    try {
      const credentials = req.body;
      const user = await authService.login(credentials.email, credentials.password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      const isMatch = await bcrypt.compare(credentials.password, user.password);
      console.log(user);
      if(!isMatch) res.status(400).json({message:"password is incorrect"})
      
      const token = jwt.sign({user},process.env.JWT_TOKEN_KEY, {expiresIn:"1h"})
      res.status(200).json({ user,token });
    } catch (error) {
      console.error('Login error:', error); // Log the detailed error
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error logging out');
      }
      res.redirect('/');
    });
  });
  
  // Auth with Google
  router.get(
    '/google',
    passport.authenticate('google')
  );
  
  // Callback route for Google to redirect to
  // Hand control to passport to use the code to grab profile info
  router.get(
    '/google/callback',
    passport.authenticate('google'),    
    (req, res) => {
      // Successful authentication, redirect to profile page
      res.redirect('http://localhost:5173/');
    }
  );

module.exports = router