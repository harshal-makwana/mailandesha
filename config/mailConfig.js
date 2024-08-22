require('dotenv').config();

module.exports = {
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
          user: 'harshalmakwana84@gmail.com',
          pass: process.env.GOOGLE_APP_PASSWORD
        }
    }
  };