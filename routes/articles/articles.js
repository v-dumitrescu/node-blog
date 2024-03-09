const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../../helpers/accessControl');
const articlesController = require('../../controllers/articles/articles');

router.get('/', articlesController.getArticles);
router.get('/create', ensureAuthenticated, articlesController.getArticleForm);
router.post('/create', ensureAuthenticated, articlesController.createArticle);

module.exports = router;