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


module.exports = {
  getArticles
};