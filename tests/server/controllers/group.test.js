import chai from 'chai';
import chaiHttp from 'chai-http';

// import mock data
import mockData from '../../__mock__/dummy';
import mockTestData from '../../__mock__/testDummy';

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

describe('Group Controllers Tests', () => {
  // beforehook to signin a user and get a valid auth token
  before((done) => {
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
  describe('given that users hit this route POST /api/v1/groups', () => {
    it('should check if POST /api/v1/groups/ is protected', (done) => {
      chai.request(app)
        .post('/api/v1/groups/')
        .type('form')
        .send(mockTestData.newGroup)
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
    it('should create a New Group with the provided parameters', (done) => {
      chai.request(app)
        .post('/api/v1/groups/')
        .set('x-access-token', authToken)
        .type('form')
        .send(mockTestData.newGroup)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.group).to.be.an('object');
          assert.strictEqual(
            res.body.group.name,
            mockData.groupName,
            'group created with correct name'
          );
          expect(res.body.group)
            .to.have.property('desc', mockData.groupDesc);
          done();
        });
    });
    it('should check if group name is not provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/groups/')
          .set('x-access-token', authToken)
          .type('form')
          .send(mockTestData.noGroupName)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.message,
              'Name parameter is required',
              'group name was not provided'
            );
            done();
          });
      });
    it('should check if GET /api/v1/groups/ is protected', (done) => {
      chai.request(app)
        .get('/api/v1/groups/')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('should GET get all created groups via /api/v1/groups/', (done) => {
      chai.request(app)
        .get('/api/v1/groups/')
        .set('x-access-token', authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.allGroups.should.be.an('array');
          assert.isAtLeast(res.body.allGroups.length, 1, 'length of group >= 1');
          expect(res.body.allGroups[0]).to.be.an('object');
          expect(res.body.allGroups[0])
            .to.have.property('name', mockData.groupName);
          expect(res.body.allGroups[0])
            .to.have.property('desc', mockData.groupDesc);
          done();
        });
    });
    it('should return error if user has no userId or doesnot exist', () => {
      chai.request(app)
        .get('/api/v1/groups/')
        .set('x-access-token', null)
        .end((err, res) => {
          res.status.have.status(404);
        });
    });
  });
});
