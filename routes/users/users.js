const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.get('/signin', (req, res) => {
  res.render('users/login')
});

module.exports = router;