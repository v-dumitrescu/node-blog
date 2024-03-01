const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate(
  'github', 
  {
    scope: ['user:email']
  }
));

router.get('/redirect', passport.authenticate('github'), (req, res) => {
  res.send('authenticated');
});

module.exports = router;