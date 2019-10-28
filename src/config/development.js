module.exports = {
  env: 'development',
  db: {
    host: process.env.DBURI,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD
  },
  port: process.env.PORT,
  jwtsecret: process.env.JWTSECRET
};
