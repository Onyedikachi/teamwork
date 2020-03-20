const { pool } = require('../../db');

const Comment = {};

Comment.add = values =>
  new Promise((resolve, reject) => {
    const query = `INSERT INTO comments 
    (comment, content, content_id, user_id, comment_date, last_updated)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    pool.query(query, values, (error, result) => {
      if (error) {
        reject(new Error('Incorrect query parameters'));
      }
      resolve(result.rows[0]);
    });
  });
Comment.get = contentId =>
  new Promise((resolve, reject) => {
    const query = `SELECT * FROM comments AS com INNER JOIN contents AS con ON con.content_id = com.content
    WHERE com.content_id = $1;
    `;
    const values = [];
    values.push(contentId);

    pool.query(query, values, (error, result) => {
      if (error) {
        reject(new Error('Incorrect query parameters'));
      }
      resolve(result.rows);
    });
  });
module.exports = Comment;
