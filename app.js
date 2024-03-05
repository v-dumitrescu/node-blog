const path = require('path');

require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();

require('./config/connection');
require('./config/passport');

const gitHubAuthRoutes = require('./routes/auth/github-auth');
const googleAuthRoutes = require('./routes/auth/google-auth');

const articlesRoutes = require('./routes/articles/articles');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth/github', gitHubAuthRoutes);
app.use('/auth/google', googleAuthRoutes);

app.use('/articles', articlesRoutes);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});