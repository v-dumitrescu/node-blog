const User = require('../../models/User');
const GoogleStrategy = require('passport-google-oauth20');

module.exports = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({
    GoogleID: profile.id
  })
  .then(user => {
    if(user) {
      return done(null, user);
    }
    const setUser = {
      GoogleID: profile.id,
      firstName: profile.name.givenName,
      avatar: profile.photos[0].value
    };
    new User(setUser)
      .save()
      .then(user => done(null, user))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});