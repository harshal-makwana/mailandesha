const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model'); 
const dotenv = require("dotenv");
dotenv.config();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        scope: ['profile', 'email'], // Ensure these are valid scopes
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          let existingUser = await User.findOne({ email: email });
          if (existingUser) {
            done(null, existingUser);
          } else {
            const newUser = await new User({
              
              email: email,
              name: profile.displayName,
          
            }).save();
            done(null, newUser);
          }
        }
         catch (err) {
        console.error('Error during OAuth process:', err); // Log the error
        done(err, null);
      }
      }
    )
  );
  

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
