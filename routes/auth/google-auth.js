const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/articles/dashboard');
});

module.exports = router;