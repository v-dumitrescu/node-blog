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

// View Engine
app.set('view engine', 'ejs');

// Set Public Directories
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/tinymce', express.static(path.join(__dirname, '..', 'node_modules', 'tinymce')));

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

// Passport Strategies
const gitHubAuthRoutes = require('../routes/auth/github-auth');
const googleAuthRoutes = require('../routes/auth/google-auth');
const localAuthRoutes = require('../routes/auth/local-auth');

// Users Routes
const usersRoutes = require('../routes/users/users');

// Articles Routes
const articlesRoutes = require('../routes/articles/articles');

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Index Pages
app.get('/', (req, res) => {
  res.render('index');
});

// Authentication Routes
app.use('/auth/github', gitHubAuthRoutes);
app.use('/auth/google', googleAuthRoutes);
app.use('/auth', localAuthRoutes);

// User Routes
app.use('/users', usersRoutes);

// Articles Routes
app.use('/articles', articlesRoutes);

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = app;