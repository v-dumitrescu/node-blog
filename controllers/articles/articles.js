const Article = require('../../models/Article');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const date = require('../../helpers/date');

const getArticles = (req, res) => {
  Article.find({
    status: 'published'
  })
    .populate('user')
    .sort({
      date: 'desc'
    })
    .then((articles) => {
      res.render('articles/articles', {
        articles,
        date
      })
    })
    .catch(err => console.log(err));
};

const getArticleForm = (req, res) => {
  res.render('articles/form');
};

const createArticle = (req, res) => {
  const { title, description, status, body } = req.body;

  const removeEntities = body.replace(/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/ig, '');
  const removeWhiteSpace = removeEntities.replace(/\s+/g, '');
  const removeHTML = removeWhiteSpace.replace(/<[^>]*>/g, '');

  if (!title.trim() || !description.trim() || !removeHTML) {
    return res.redirect('/articles/create');
  }

  if (description.trim().length > 100) {
    return res.send('Description should not be too long!');
  }

  const setArticle = {
    title,
    description,
    status,
    body,
    user: req.user.id
  };
  new Article(setArticle)
    .save()
    .then((article) => res.redirect('/dashboard'))
    .catch(err => console.log(err));
};

module.exports = {
  getArticles,
  getArticleForm,
  createArticle
};