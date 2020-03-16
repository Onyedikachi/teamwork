const { pool } = require('../../db');

const Gif = {};

Gif.create = ({ gifName, gifUrl, gifStatus, userId, createdOn }) =>
  new Promise((resolve, reject) => {
    const values = [];
    values.push(gifUrl);
    values.push(gifStatus);
    values.push(userId);
    values.push(gifName);
    values.push(createdOn);

    const query = `INSERT INTO gifs (gif_url, gif_status, user_id, gif_name, created_on) VALUES($1, $2, $3, $4, $5) RETURNING *`;

    pool.query(query, values, (err, results) => {
      if (err) {
        reject();
      } else {
        resolve(results.rows[0]);
      }
    });
  });

module.exports = Gif;
