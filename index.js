const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const emailRoutes = require('./routes/email.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const paymentRoutes = require('./routes/payment.routes.js');
const dotenv = require('dotenv')
dotenv.config();
require('./config/passport-config');
require('./config/database.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use cookie-session
app.use(session({
  secret: 'your_secret_key', // Replace with your secret key
  resave: false,
  saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// const routes = require('./routes');
// app.use('/', routes);
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});


app.get("/", (req, res) => {
      res.send("hello from node app")
})

app.use("/api",emailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);

// app.post('/api/data', (req, res) => {
//   console.log('Received data:', req.body);
//   res.send(`Data received: ${req.body.data}`);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});