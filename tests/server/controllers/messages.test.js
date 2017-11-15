import chai from 'chai';
import chaiHttp from 'chai-http';

// import mock data
import mockData from '../../__mock__/dummy';

// import app
import app from '../../../server/app';

// setting my dev environment to test
process.env.NODE_ENV = 'test';

const assert = chai.assert;
const should = chai.should();
chai.use(chaiHttp);

// global variables
let authToken;

describe('Message Controllers Tests', () => {
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

  // describe send message to a group by a logged in user endpoint
  describe('when a users hit this route POST /api/v1/groups/:id/message',
    () => {
      it('should check if route is protected', (done) => {
        chai.request(app)
          .post(`/api/v1/groups/${mockData.groupId}/message/`)
          .type('form')
          .send({
            userId: 1,
            text: 'some message content test',
            groupId: 1,
            priority: 1
          })
          .end((err, res) => {
            res.status.should.equal(401);
            assert.strictEqual(
              res.body.message,
              'sorry, user not authenticated, invalid access token',
              'sorry, user not authenticated, invalid access token'
            );
            done();
          });
      });

      it('should send a message to a group-1',
        (done) => {
          chai.request(app)
            .post(`/api/v1/groups/${mockData.groupId}/message/`)
            .set('x-access-token', authToken)
            .type('form')
            .send({
              userId: mockData.usersId,
              text: mockData.messageString,
              groupId: mockData.groupId,
              priority: 'Normal'
            })
            .end((err, res) => {
              res.status.should.equal(201);
              assert.strictEqual(
                res.body.text,
                mockData.messageString,
                'message sent with Normal Priority'
              );
              done();
            });
        });

      it('should send a message with critical priority to a group and email',
        (done) => {
          chai.request(app)
            .post(`/api/v1/groups/${mockData.groupId}/message/`)
            .set('x-access-token', authToken)
            .type('form')
            .send({
              userId: mockData.usersId,
              text: mockData.messageString,
              groupId: mockData.groupId,
              priority: 'Critical'
            })
            .end((err, res) => {
              res.status.should.equal(201);
              assert.strictEqual(
                res.body.text,
                mockData.messageString,
                'message sent with Critical Priority'
              );
              done();
            });
        });

      it('should send an urgent priority message group, email and phoneNumber',
        (done) => {
          chai.request(app)
            .post(`/api/v1/groups/${mockData.groupId}/message/`)
            .set('x-access-token', authToken)
            .type('form')
            .send({
              userId: mockData.usersId,
              text: mockData.messageString,
              groupId: mockData.groupId,
              priority: 'Urgent'
            })
            .end((err, res) => {
              res.status.should.equal(201);
              assert.strictEqual(
                res.body.text,
                mockData.messageString,
                'message sent with Urgent Priority'
              );
              done();
            });
        });

      it('should not send message if text is empty',
        (done) => {
          chai.request(app)
            .post(`/api/v1/groups/${mockData.groupId}/message/`)
            .set('x-access-token', authToken)
            .type('form')
            .send({
              userId: mockData.usersId,
              groupId: mockData.groupId,
              priority: 'Priority'
            })
            .end((err, res) => {
              res.status.should.equal(400);
              assert.strictEqual(
                res.body.message,
                'cannot send empty message',
                'message content is empty'
              );
              done();
            });
        });
    });
  describe('GET /api/v1/groups/:id/messages', () => {
    it('should check if GET message route is protected', (done) => {
      chai.request(app)
        .get(`/api/v1/groups/${mockData.groupId}/messages`)
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

    it('should get all messages in a group via GET /api/groups/:id/messages/',
      (done) => {
        chai.request(app)
          .get(`/api/v1/groups/${mockData.groupId}/messages/`)
          .set('x-access-token', authToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            assert
              .isAtLeast(res.body.length, 1, 'length of messages array >= 1');
            done();
          });
      });

    it('should not update message read in a group if already read',
      (done) => {
        chai.request(app)
          .post('/api/v1/groups/1/message/read')
          .set('x-access-token', authToken)
          .send({
            id: mockData.usersId
          })
          .end((err, res) => {
            res.should.have.status(400);
            assert.strictEqual(
              res.body.message,
              'message has been read by you',
              'message read table was not re-updated'
            );
            done();
          });
      });
  });
});
