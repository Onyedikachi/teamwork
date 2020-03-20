module.exports = {
  env: 'production',
  db: {
    host: process.env.DBURI,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD
  },
  port: process.env.PORT,
  jwtsecret: process.env.JWTSECRET,
  cloudStore: {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    cloudName: process.env.CLOUD_NAME
  }
};
