const passport = require('passport');
const User = require('../models/User');
const GitHubStrategy = require('./passport-strategies/GitHubStrategy');
const GoogleStrategy = require('./passport-strategies/GoogleStrategy');
const LocalStrategy = require('./passport-strategies/LocalStrategy');

passport.use(GitHubStrategy);
passport.use(GoogleStrategy);
passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user));
});