const { pool } = require('../../db');

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

module.exports = Article;
