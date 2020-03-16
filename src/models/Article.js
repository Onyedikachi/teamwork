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

    console.log(values);

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

module.exports = Article;
