const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

module.exports = new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({
    email
  })
  .then(user => {
    if(user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if(err) throw err;
        if(res) {
          return done(null, user);
        }
        return done(null, false, {
          message: 'Invalid credentials'
        });
      });
    } else {
      return done(null, false, {
        message: 'Invalid credentials'
      });
    }
  })
  .catch(err => console.log(err));
});