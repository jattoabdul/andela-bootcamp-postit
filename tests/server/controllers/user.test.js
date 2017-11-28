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
let hash;

describe('Users Controllers Tests', () => {
  describe('given that users hit this route POST /api/v1/users/signup',
    () => {
      it('should return 201 status & should create a user with correct params',
        (done) => {
          chai
            .request(app)
            .post('/api/v1/users/signup')
            .type('form')
            .send(mockTestData.signupData)
            .end((err, res) => {
              assert.strictEqual(
                res.body.newUser.email,
                mockData.validEmail,
                'email sent is correct'
              );
              assert.strictEqual(
                res.body.newUser.username,
                mockData.validUsername,
                'username sent is correct'
              );
              res.should.have.status(201);
              done();
            });
        });
      it('should raise 400 error without password parameter', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'password cannot be empty',
              'password field is empty'
            );
            done();
          });
      });

      it('should raise 400 error without username parameter', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData2)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'username cannot be empty',
              'username field is empty'
            );
            done();
          });
      });

      it('should raise 400 error without email parameter', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData3)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'email cannot be empty',
              'email field is empty'
            );
            done();
          });
      });

      it('should raise 400 error without phone parameter', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData4)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'phone cannot be empty',
              'phone field is empty'
            );
            done();
          });
      });

      it('should raise 409 error with duplicate email', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData5)
          .end((err, res) => {
            res.should.have.status(409);
            assert.strictEqual(
              res.body.error.message,
              'email already exists',
              'email must be unique'
            );
            done();
          });
      });

      it('should raise 409 error with duplicate username', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData6)
          .end((err, res) => {
            res.should.have.status(409);
            assert.strictEqual(
              res.body.error.message,
              'username already exists',
              'username must be unique'
            );
            done();
          });
      });

      it('should raise 400 error with invalid email', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData7)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'not an email',
              'email is invalid'
            );
            done();
          });
      });

      it('should raise 400 error with empty password', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData8)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'password cannot be empty',
              'password is empty'
            );
            done();
          });
      });

      it('should raise 400 error with empty username', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData9)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'username cannot be empty',
              'username is empty'
            );
            done();
          });
      });

      it('should raise 400 error with empty email', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData10)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'email cannot be empty',
              'email is empty'
            );
            done();
          });
      });

      it('should raise 400 error with empty phoneNumber', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .type('form')
          .send(mockTestData.invalidSignupData11)
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.error.message,
              'phone cannot be empty',
              'phoneNumber is empty'
            );
            done();
          });
      });
    });

  describe('given that users hit this route POST /api/v1/user/signin',
    () => {
      it('should login user and return auth token', (done) => {
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
      it('should return 404 status if username does not exist', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin/')
          .type('form')
          .send({
            username: mockData.username,
            password: mockData.password
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.message.should.equal('username does not exist');
            done();
          });
      });
      it('should return 401 status if password is incorrect', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin/')
          .type('form')
          .send({
            username: mockData.validUsername,
            password: mockData.password
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.error.message.should.equal('invalid password and username');
            done();
          });
      });
    // new assertions
    });

  describe('given that users hit this route POST /api/v1/users/reset/request',
    () => {
      it('should raise 400 error without email parameter', (done) => {
        chai.request(app)
          .post('/api/v1/users/reset/request')
          .type('form')
          .send({
            email: undefined
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('should request password update and generate hash', (done) => {
        chai.request(app)
          .post('/api/v1/users/reset/request')
          .type('form')
          .send({
            email: mockData.validEmail
          })
          .end((err, res) => {
            hash = res.body.data.hash;
            console.log('password reset request success ======>', hash);
            res.should.have.status(200);
            assert.strictEqual(
              res.body.data.message,
              'Password Request Successful',
              'Password Request Successful and hash generated'
            );
            done();
          });
      });
    });
  describe('given that users hit this route POST /api/v1/users/reset/:hash',
    () => {
      it('should raise 400 error without password parameter', (done) => {
        chai.request(app)
          .post('/api/v1/users/reset/:hash')
          .type('form')
          .send({
            password: undefined
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('should update password succesfully', (done) => {
        chai.request(app)
          .post(`/api/v1/users/reset/${hash}`)
          .type('form')
          .send({
            password: mockData.validPassword
          })
          .end((err, res) => {
            res.should.have.status(200);
            assert.strictEqual(
              res.body.data.message,
              'Password Reset Successful',
              'Password was Reset Successful'
            );
            done();
          });
      });
    });
  describe('given that users hit this route GET /api/v1/users/ ',
    () => {
      it('should return all registered users in the app', (done) => {
        chai.request(app)
          .get('/api/v1/users/')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.users).to.be.an('array');
            expect(res.body.users[0])
              .to.have.property('username', 'johndoe');
            expect(res.body.users[0])
              .to.have.property('fullName', 'john doe');
            expect(res.body.users[0])
              .to.have.property('email', 'johndoe@test.com');
            expect(res.body.users[0])
              .to.have.property('phoneNumber', '08162740850');
            done();
          });
      });

      it('should return error 401 for unauthenticated user', (done) => {
        chai.request(app)
          .get('/api/v1/users/')
          .type('form')
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
    });
  describe('given that users hit this route GET /api/v1/user/ ',
    () => {
      it('should return all registered users in the app', (done) => {
        chai.request(app)
          .get('/api/v1/user/')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data)
              .to.have.property('username', 'johndoe');
            expect(res.body.data)
              .to.have.property('fullName', 'john doe');
            expect(res.body.data)
              .to.have.property('email', 'johndoe@test.com');
            expect(res.body.data)
              .to.have.property('phoneNumber', '08162740850');
            done();
          });
      });

      it('should return error 404 for unauthenticated user', (done) => {
        chai.request(app)
          .get('/api/v1/user/')
          .type('form')
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
    });
// new describe for new route
});
