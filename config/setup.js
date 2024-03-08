// Internal Node Module
const path = require('path');

// Third Party Modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// Express init
const app = express();

// DB Connection
require('./connection');

// Passport Configuration
require('./passport');
const passport = require('passport');

// Set Public Directories
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));

// Cookie Session Config
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

// Set passport cookie session
app.use(passport.initialize());
app.use(passport.session());

// Oauth Strategies
const gitHubAuthRoutes = require('../routes/auth/github-auth');
const googleAuthRoutes = require('../routes/auth/google-auth');
const articlesRoutes = require('../routes/articles/articles');

// Index Pages
app.get('/', (req, res) => {
  res.render('index');
});

// Oauth Routes
app.use('/auth/github', gitHubAuthRoutes);
app.use('/auth/google', googleAuthRoutes);

// Articles Routes
app.use('/articles', articlesRoutes);

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = app;