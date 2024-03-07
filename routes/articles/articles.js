const express = require('express');
const router = express.Router();

const articlesController = require('../../controllers/articles/articles');

router.get('/create', (req, res) => {
  res.render('articles/form');
});

router.get('/', articlesController.getArticles);

module.exports = router;