const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

module.exports = router;