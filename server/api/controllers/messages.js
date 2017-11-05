/**
 * Messages Controller
 * handles every groups users related task and authentication
 */

// importing services
import Nexmo from 'nexmo';
import nodemailer from 'nodemailer';
import models from '../models';

let userID = 0;

/**
 * sendEmail
 * @param {object} email 
 * @param {object} message 
 * @param {object} priority 
 * @return {object} info
 */
const sendEmail = (email, message, priority) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: 'jattoade@gmail.com',
      pass: 'jasabs93'
    }
  });

  const mailOptions = {
    from: "'POSTIT' <jattoade@gmail.com>",
    to: email,
    subject: `POSTIT: You have a new message of priority ${priority}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return info;
  });
};

/**
 * fetchMembersEmail
 * @param {object} groupId 
 * @return {object} group
 */
const fetchMembersEmail = groupId =>
  new Promise((resolve) => {
    models.Groups.findOne({
      where: {
        id: groupId
      },
      attributes: ['id']
    })
      .then((group) => {
        group.getUsers({
          attributes: ['id', 'username', 'email', 'phoneNumber']
        })
          .then((users) => {
            resolve(users);
          });
      });
  });

export default {
  /**
   * sendMsg
   * @param {object} req 
   * @param {object} res 
   * @return {object} result
   */
  sendMsg(req, res) {
    const userName = req.authToken.data.username;
    if (!req.body.text || req.body.text.trim() === '') {
      res.status(400).send({ message: 'cannot send empty message' });
      return;
    }

    models.Users
      .findOne({
        where: { username: userName }
      })
      .then((user) => {
        if (user) {
          userID = user.id;
          models.GroupsUsers
            .find({
              where: {
                userId: userID,
                groupId: req.params.id
              }
            })
            .then((groupMember) => {
              if (!groupMember) {
                return res.status(401).send({
                  message: 'User does not belong to group'
                });
              }
              return models.Messages
                .create({
                  userId: userID,
                  groupId: req.params.id,
                  text: req.body.text,
                  priority: req.body.priority,
                  readBy: [`${userName}`]
                })
                .then((message) => {
                  if (req.body.priority === 'Critical') {
                    fetchMembersEmail(req.params.id).then(
                      (results) => {
                        results.map((result) => {
                          sendEmail(result.dataValues.email,
                            `${userID}: ${req.body.text}`, 'Critical');
                          // send sms notification
                          const nexmo = new Nexmo({
                            apiKey: '2a78b29f',
                            apiSecret: 'acf27ddd3a3ed3b3'
                          });
                          const frmUser = `${user.phoneNumber}`;
                          const toUser = `${result.dataValues.phoneNumber}`;
                          if (toUser !== frmUser) {
                            nexmo.message.sendSms(
                              frmUser, toUser,
                              `just POSTIT: You have a message marked as 
                          ${req.body.priority}
                          \n${userID}: ${req.body.text}`,
                              (err, responseData) => {
                                if (err) {
                                  return err;
                                }
                                return responseData;
                              }
                            );
                          }
                          return result;
                        });
                      });
                  }
                  if (req.body.priority === 'Urgent') {
                    fetchMembersEmail(req.params.id).then(
                      (results) => {
                        results.map(result =>
                          sendEmail(result.dataValues.email,
                            `${userID}: ${req.body.text}`, 'Urgent'));
                      });
                  }
                  res.status(201).send(message);
                })
                .catch(error => res.status(500).send(error));
            });
        }
      })
      .catch(error => res.status(404).send(error));
  },

  /**
   * getMsg
   * @param {object} req 
   * @param {object} res 
   * @return {object} messages
   */
  getMsg(req, res) {
    models.Messages
      .findAll({
        where: { groupId: [req.params.id] },
        attributes: [
          'id',
          'text',
          'userId',
          'groupId',
          'priority',
          'readBy',
          'createdAt'
        ],
        include: [{
          model: models.Users,
          attributes: ['id', 'username', 'fullName'],
          as: 'user'
        }]
      })
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(404).send(error));
  },

  /**
   * updateReadBy
   * @param {object} req 
   * @param {object} res 
   * @return {object} message
   */
  updateReadBy(req, res) {
    models.Messages
      .findOne({
        where: {
          id: req.body.id
        }
      })
      .then((message) => {
        const userName = req.authToken.data.username;
        if (message.readBy.includes(userName) === false) {
          message.readBy.push(userName);
          message.update({
            readBy: message.readBy
          });
          return res.status(200).send(message);
        }
        res.status(400).send({ message: 'message has been read by you' });
      })
      .catch(error => res.status(400).send(error));
  }
};
