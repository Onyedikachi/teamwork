const Request = require('request');

describe('Server', () => {
  var app;
  beforeAll(() => {
     app = require('../server');
  });
  afterAll(() => {
    app.close();
  });
});
