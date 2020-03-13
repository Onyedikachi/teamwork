const pg = require('pg');
const bcrypt = require('bcrypt');
const { pool } = require('../../db');

const User = {};
User.saveUser = ({
  userName,
  userPhone,
  userEmail,
  userAddress,
  userPassword,
  isAdmin
}) =>
  new Promise((resolve, reject) => {
    let role = 0;
    if (isAdmin) role = 1;

    const saltRounds = 10;
    bcrypt.hash(userPassword, saltRounds, (error, hash) => {
      const values = [];
      values.push(userPhone);
      values.push(userEmail);
      values.push(hash);
      values.push(role);
      values.push(userAddress);
      values.push(userName);

      const query = `INSERT INTO users (user_phone, user_email, user_password, 
    role_id,user_address, user_name) VALUES($1, $2, $3, $4,$5, $6) RETURNING *`;

      pool.query(query, values, (err, results) => {
        if (err) {
          reject();
        } else {
          resolve(results.rows[0]);
        }
      });
    });
  });
User.emailExists = email =>
  new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email],
      (error, results) => {
        if (error) {
          reject();
        } else {
          resolve(results);
        }
      }
    );
  });

module.exports = User;
