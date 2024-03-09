const Article = require('../../models/Article');

const getArticles = (req, res) => {
  Article.find({
    status: 'published'
  })
  .sort({
    date: 'desc'
  })
  .then((articles) => {
    res.render('articles/articles', {
      articles
    })
  })
  .catch(err => console.log(err));
};

const getArticleForm = (req, res) => {
  res.render('articles/form');
};

const createArticle = (req, res) => {
  const { title, status, body } = req.body;
  if(!title.trim() || !body.trim()) {
    return res.redirect('/articles/create');
  }
  const setArticle = {
    title,
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