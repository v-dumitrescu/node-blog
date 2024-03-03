const express = require('express');
const router = express.Router();

router.get('/create', (req, res) => {
  res.render('articles/form');
});

module.exports = router;