import chai from 'chai';
import chaiHttp from 'chai-http';

// import mock data
import mockData from '../../__mock__/dummy';

// import app
import app from '../../../server/app';

// setting my dev environment to test
process.env.NODE_ENV = 'test';

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
chai.use(chaiHttp);

// global variables
let authToken;

describe('GroupUsers Controllers Tests', () => {
  // beforehook to signin a user and get a valid auth token
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .type('form')
      .send({
        username: mockData.validUsernameTwo,
        email: mockData.validEmailTwo,
        password: mockData.validPasswordTwo,
        fullName: mockData.validFullNameTwo,
        phoneNumber: mockData.validPhoneNumberTwo
      })
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .post('/api/v1/users/signin/')
          .type('form')
          .send({
            username: mockData.validUsername,
            password: mockData.validPassword
          })
          .end((err, res) => {
            res.should.have.status(202);
            res.body.token.should.not.equals(null);
            authToken = res.body.token; // set authToken
            done();
          });
      });
  });
  describe('when a users hit this route POST /api/v1/groups/:id/user', () => {
    // add member route
    it('should check if POST /api/v1/groups/:id/user is protected', (done) => {
      chai.request(app)
        .post('/api/v1/groups/1/user')
        .type('form')
        .send({
          userId: mockData.usersId,
          groupId: mockData.groupId,
          isAdmin: '0'
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.strictEqual(
            res.body.message,
            'sorry, user not authenticated, invalid access token',
            'sorry, user not authenticated, invalid access token'
          );
          done();
        });
    });

    it('should return error if no ID of user to be added to a group',
      (done) => {
        chai.request(app)
          .post('/api/v1/groups/1/user')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            groupId: mockData.groupId,
            isAdmin: '0'
          })
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'userId parameter is required',
              'No userId provided'
            );
            done();
          });
      });

    it('should add user Two to a group-1',
      (done) => {
        chai.request(app)
          .post('/api/v1/groups/1/user')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            userId: mockData.userTwoId,
            groupId: mockData.groupId,
            isAdmin: '0'
          })
          .end((err, res) => {
            res.should.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body)
              .to.have.property('userId', mockData.userTwoId);
            expect(res.body)
              .to.have.property('groupId', mockData.groupId);
            done();
          });
      });
  });

  // describe search users endpoint
  describe('for this route GET /api/v1/groups/:id/:page/usersearch', () => {
    it('should check if route is protected', (done) => {
      chai.request(app)
        .get(`/api/v1/groups/${mockData.groupId}/1/usersearch`)
        .end((err, res) => {
          res.should.have.status(401);
          assert.strictEqual(
            res.body.message,
            'sorry, user not authenticated, invalid access token',
            'sorry, user not authenticated, invalid access token'
          );
          done();
        });
    });

    it('should return a list of users', (done) => {
      chai.request(app)
        .get(`/api/v1/groups/${mockData.groupId}/1/usersearch`)
        .set('x-access-token', authToken)
        .query({ search: 'jan' })
        .end((err, res) => {
          expect(res.body.searchItemResult).to.be.an('object');
          expect(res.body.searchItemResult.rows).to.be.an('array');
          expect(res.body.searchItemResult.count).to.be.a('number');
          res.should.have.status(200);
          done();
        });
    });
  });
  // describe view all group members endpoint
  describe('when a users hit this route GET /api/v1/groups/users/', () => {
    it('should check if GET /api/v1/groups/users is protected', (done) => {
      chai.request(app)
        .get('/api/v1/groups/users')
        .end((err, res) => {
          res.should.have.status(401);
          assert.strictEqual(
            res.body.message,
            'sorry, user not authenticated, invalid access token',
            'sorry, user not authenticated, invalid access token'
          );
          done();
        });
    });

    it('should return all groups members throughout the app', (done) => {
      chai.request(app)
        .get('/api/v1/groups/users/')
        .set('x-access-token', authToken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.groupMembers).to.be.an('array');
          expect(res.body.groupMembers).to.have.lengthOf.above(1);
          expect(res.body.groupMembers[0])
            .to.have.property('userId', mockData.usersId);
          expect(res.body.groupMembers[1])
            .to.have.property('userId', mockData.userTwoId);
          done();
        });
    });
  });
  // describe view current group members endpoint
  describe('when at this route GET /api/v1/groups/:id/users/', () => {
    it('should check if GET /api/v1/groups/:id/users is protected', (done) => {
      chai.request(app)
        .get(`/api/v1/groups/${mockData.groupId}/users`)
        .end((err, res) => {
          res.should.have.status(401);
          assert.strictEqual(
            res.body.message,
            'sorry, user not authenticated, invalid access token',
            'sorry, user not authenticated, invalid access token'
          );
          done();
        });
    });

    it('should return all members of current group',
      (done) => {
        chai.request(app)
          .get(`/api/v1/groups/${mockData.groupId}/users`)
          .set('x-access-token', authToken)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            done();
          });
      });
  });

  // describe remove group member endpoint
  describe('when user hits this route DELETE /api/v1/groups/:id/user/', () => {
    it('should check if route is protected', (done) => {
      chai.request(app)
        .post(`/api/v1/groups/${mockData.groupId}/user`)
        .type('form')
        .send({
          UsersId: 1,
          GroupsId: 1
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.strictEqual(
            res.body.message,
            'sorry, user not authenticated, invalid access token',
            'sorry, user not authenticated, invalid access token'
          );
          done();
        });
    });

    it('should remove userTwo from group-1',
      (done) => {
        chai.request(app)
          .del(`/api/v1/groups/${mockData.groupId}/user`)
          .set('x-access-token', authToken)
          .query({ usersId: mockData.userTwoId })
          .end((err, res) => {
            res.should.have.status(202);
            assert.strictEqual(
              res.body.message,
              'User Removed Successfully',
              'User Removed Successfully'
            );
            done();
          });
      });
  });
});
