let chai = require("chai");
let request = require("supertest");
let app = require("../app.js");

describe("Auth", () => {
  it("Auth with buyer/password -> 200", (done) => {
    request(app)
      .post('/api/auth')
      .send({user: 'buyer', password: 'password'})
      .set('Accept', 'application/json')
      .set('Connection', 'close' )
      .expect(200, done)
  });
  it("Auth with another -> 404", (done) => {
    request(app)
      .post('/api/auth')
      .send({user: 'buyer1', password: 'password'})
      .set('Connection', 'close' )
      .set('Accept', 'application/json')
      .expect(404, done)
  });
});
