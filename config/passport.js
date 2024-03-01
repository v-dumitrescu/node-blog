const passport = require('passport');
const User = require('../models/User');
const GitHubStrategy = require('./passport-strategies/GitHubStrategy');
const GoogleStrategy = require('./passport-strategies/GoogleStrategy');

passport.use(GitHubStrategy);
passport.use(GoogleStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user));
});