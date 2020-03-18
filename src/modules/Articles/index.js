/* eslint-disable radix */
const Article = require('../../models/Article');

module.exports.createArticle = (req, res) => {
  const article = {};

  article.articleContent = req.body.articleContent.trim().toLowerCase();
  article.articleAuthor = req.body.articleAuthor.trim().toLowerCase();
  article.articleTitle = req.body.articleTitle;
  article.dateOfCreation = new Date().toLocaleString();
  article.authorId = parseInt(req.body.authorId);
  article.lastUpdated = new Date().toLocaleString();

  Article.create(article)
    .then(newArticle => {
      if (newArticle) {
        return res.status(200).json({
          data: {
            message: 'Article successfully posted',
            articleId: parseInt(newArticle.article_id),
            createdOn: new Date(
              `${newArticle.date_of_creation}`
            ).toLocaleString(),
            authorId: newArticle.author_id,
            title: newArticle.article_title
          },
          status: 'success'
        });
      }
      return res.status(400).json({
        data: {
          message: 'Error creating Article'
        },
        status: 'error'
      });
    })
    .catch(error => {
      return res.status(400).json({
        data: {
          message: 'Error creating Article'
        },
        status: 'error'
      });
    });
};
module.exports.updateArticle = (req, res) => {
  const article = {};
  article.articleId = parseInt(req.params.articleId);
  article.articleContent = req.body.articleContent.trim().toLowerCase();
  article.articleAuthor = req.body.articleAuthor.trim().toLowerCase();
  article.articleTitle = req.body.articleTitle.trim().toLowerCase();
  article.lastUpdated = new Date().toLocaleString();

  Article.update(article)
    .then(newArticle => {
      if (newArticle) {
        return res.status(200).json({
          data: {
            message: 'Article successfully updated',
            articleId: parseInt(newArticle.article_id),
            updatedOn: new Date(`${newArticle.last_updated}`).toLocaleString(),
            authorId: newArticle.author_id,
            title: newArticle.article_title
          },
          status: 'success'
        });
      }
      return res.status(400).json({
        data: {
          message: 'Error updating Article'
        },
        status: 'error'
      });
    })
    .catch(error => {
      return res.status(400).json({
        data: {
          message: 'Error updating Article'
        },
        status: 'error'
      });
    });
};
module.exports.deleteArticle = (req, res) => {
  const article = {};
  article.articleId = parseInt(req.params.articleId);
  Article.delete(article)
    .then(count => {
      if (count > 0) {
        return res.status(200).json({
          data: {
            message: 'Article successfully deleted'
          },
          status: 'success'
        });
      }
      return res.status(400).json({
        data: {
          message: 'Article does not exist'
        },
        status: 'error'
      });
    })
    .catch(error => {
      return res.status(400).json({
        data: {
          message: 'Error deleting Article'
        },
        status: 'error'
      });
    });
};

module.exports.commentonArticle = (req, res) => {
  const comment = {};
  comment.contentId = parseInt(req.params.articleId);
  comment.userId = parseInt(req.body.userId);
  comment.content = parseInt(req.body.content);
  comment.comment = req.body.comment;
  comment.commentDate = new Date().toLocaleString();
  comment.lastUpdated = new Date().toLocaleString();

  Article.comment(comment)
    .then(newComment => {
      if (newComment) {
        return res.status(200).json({
          data: {
            message: 'Comment successfully created',
            commentId: parseInt(newComment.comment_id),
            articleId: parseInt(newComment.content_id),
            createdOn: new Date(`${newComment.comment_date}`).toLocaleString(),
            updatedOn: new Date(`${newComment.last_updated}`).toLocaleString(),
            comment: newComment.comment
          },
          status: 'success'
        });
      }
      return res.status(400).json({
        data: {
          message: 'Error creating Comment'
        },
        status: 'error'
      });
    })
    .catch(error => {
      return res.status(400).json({
        data: {
          message: 'Error creating Comment'
        },
        status: 'error'
      });
    });
};
