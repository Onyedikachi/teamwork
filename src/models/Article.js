const { pool } = require('../../db');

const Comment = require('./Comment');

const Article = {};

Article.create = ({
  articleContent,
  articleTitle,
  articleAuthor,
  dateOfCreation,
  authorId,
  lastUpdated
}) =>
  new Promise((resolve, reject) => {
    const values = [];
    values.push(articleContent);
    values.push(articleTitle);
    values.push(articleAuthor);
    values.push(dateOfCreation);
    values.push(authorId);
    values.push(lastUpdated);

    const query = `INSERT INTO articles (article_content, article_title, article_author, 
        date_of_creation, author_id, last_updated) VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING *`;

    pool.query(query, values, (err, results) => {
      if (err) {
        reject();
      } else {
        resolve(results.rows[0]);
      }
    });
  });
Article.update = ({
  articleId,
  articleContent,
  articleTitle,
  articleAuthor,
  lastUpdated
}) =>
  new Promise((resolve, reject) => {
    const values = [];
    values.push(articleId);
    values.push(articleContent);
    values.push(articleTitle);
    values.push(articleAuthor);
    values.push(lastUpdated);

    const query = `UPDATE articles 
      SET article_content = $2,  article_title = $3, article_author = $4, last_updated = $5
      WHERE article_id = $1 RETURNING *`;

    pool.query(query, values, (err, results) => {
      if (err) {
        reject();
      } else {
        resolve(results.rows[0]);
      }
    });
  });

Article.delete = ({ articleId }) =>
  new Promise((resolve, reject) => {
    const values = [];
    values.push(articleId);

    const query = `DELETE FROM articles WHERE article_id = $1`;

    pool.query(query, values, (err, results) => {
      if (err) {
        reject();
      } else {
        resolve(results.rowCount);
      }
    });
  });

Article.comment = ({
  comment,
  content,
  contentId,
  userId,
  commentDate,
  lastUpdated
}) =>
  new Promise((resolve, reject) => {
    const values = [];

    values.push(comment);
    values.push(content);
    values.push(contentId);
    values.push(userId);
    values.push(commentDate);
    values.push(lastUpdated);

    Comment.add(values)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject();
      });
  });

Article.getArticles = () =>
  new Promise((resolve, reject) => {
    const query = `SELECT * FROM articles ORDER BY last_updated DESC`;

    pool.query(query, (err, results) => {
      if (err) {
        reject();
      } else {
        resolve(results.rows);
      }
    });
  });

Article.findArticleById = articleId =>
  new Promise((resolve, reject) => {
    const query = `SELECT art.article_id As articleId, 
    art.date_of_creation As createdOn, art.article_title As articleTitle, 
    art.article_content As article 
    FROM
    articles AS art
	  WHERE art.article_id = $1;`;

    const values = [];
    values.push(articleId);

    pool.query(query, values, (err, res) => {
      const article = res.rows[0];
      if (err) {
        reject(new Error('Article not found'));
      }

      if (article)
        Comment.get(article.articleid)
          .then(comments => {
            if (comments) {
              article.comments = comments;
            }
            resolve(article);
          })
          .catch(error => {
            reject(new Error('Error encountered while fetching comments'));
          });
      else reject(new Error('Invalid article'));
    });
  });

module.exports = Article;
