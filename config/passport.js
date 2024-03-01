const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const User = require('../models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/github/redirect'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({
    GitHubID: profile.id
  })
    .then(user => {
      if (user) {
        return done(null, user);
      }
      const firstName = profile.displayName ? profile.displayName.split(' ')[0]
        : profile.username;
      const setUser = {
        GitHubID: profile.id,
        firstName
      };
      new User(setUser)
        .save()
        .then((user) => done(null, user))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user));
});