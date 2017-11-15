import chai from 'chai';
import chaiHttp from 'chai-http';

// import app
import app from '../../../server/app';
// import my models for unit testing
import models from '../../../server/api/models';

// setting my dev environment to test
process.env.NODE_ENV = 'test';

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);


// resetting database by deleting data created by test and reseting identity
models
  .Users
  .destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

models
  .Messages
  .destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

models
  .Groups
  .destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

models
  .GroupsUsers
  .destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });


/*
* describing the GET /api/v1 root route default
* to have status code => 200 and a welcome message
*/
describe('GET /api/v1 route', () => {
  it('should responds with a 200 and welcome message in json', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message)
          .to
          .equal('Welcome to Andela Bootcamp PostIt Project API');
        expect(res)
          .to
          .have
          .status(200);
        done();
      });
  });
});
