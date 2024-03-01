const User = require('../../models/User');
const GitHubStrategy = require('passport-github2');

module.exports = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/redirect'
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
        firstName,
        avatar: profile.photos[0].value
      };
      new User(setUser)
        .save()
        .then((user) => done(null, user))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})