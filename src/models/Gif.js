const cloudinary = require('cloudinary');
const { pool } = require('../../db');
const config = require('../config');
const Comment = require('./Comment');

cloudinary.config({
  cloud_name: config.cloudStore.cloudName,
  api_key: config.cloudStore.apiKey,
  api_secret: config.cloudStore.apiSecret
});
const Gif = {};

Gif.create = ({ gifName, gifUrl, gifStatus, userId, createdOn, publicId }) =>
  new Promise((resolve, reject) => {
    const values = [];
    values.push(gifUrl);
    values.push(gifStatus);
    values.push(userId);
    values.push(gifName);
    values.push(createdOn);
    values.push(publicId);

    const query = `INSERT INTO gifs (gif_url, gif_status, user_id, gif_name, created_on, public_id) 
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

    pool.query(query, values, (err, results) => {
      if (err) {
        reject();
      } else {
        resolve(results.rows[0]);
      }
    });
  });
Gif.delete = ({ gifId }) =>
  new Promise((resolve, reject) => {
    const values = [];
    values.push(gifId);
    pool.query(`SELECT * FROM gifs WHERE gif_id = $1`, values, (err, res) => {
      if (err) {
        reject(new Error('Image id not found'));
      }
      const gifDetails = res.rows[0];
      cloudinary.v2.uploader.destroy(gifDetails.public_id, (error, result) => {
        if (error) {
          reject(new Error('Image not found in online storage'));
        }
        const query = `DELETE FROM gifs WHERE gif_id = $1`;

        pool.query(query, values, (errr, results) => {
          if (errr) {
            reject(new Error('Image not found in database'));
          } else {
            resolve(results.rowCount);
          }
        });
      });
    });
  });
Gif.comment = commentDesc =>
  new Promise((resolve, reject) => {
    const values = Object.keys(commentDesc).map(key => {
      return commentDesc[key];
    });

    Comment.add(values)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject();
      });
  });
module.exports = Gif;
