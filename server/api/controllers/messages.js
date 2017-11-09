/**
 * Messages Controller
 * handles every groups users related task and authentication
 */

// importing services
import models from '../models';
import { sendMessage } from '../utils';

let userID = 0;

/**
 * fetchMembersEmail - fetch Email Address of Member's of a group
 * 
 * @param {object} groupId 
 * 
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

export const messages = {
  /**
   * sendMsg - send message to group board and members
   * 
   * @param {object} req
   * @param {object} res 
   * 
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
                          const email = result.dataValues.email,
                            subject = 'You have a new message of Critical priority',
                            htmlMessage = `<p>${req.body.text}</p>
                            \n<a href="https://jatto-postit-app-staging.herokuapp.com">
                              View Detail</a>`;
                          sendMessage.email(email, subject, htmlMessage);
                          // send sms notification
                          const frmUser = `${user.fullName}`,
                            toUser = `${result.dataValues.phoneNumber}`,
                            text = `Just POSTiT: You have a marked as ${req.body.priority}
                              \n${req.body.text}`;
                          if (toUser !== frmUser) {
                            sendMessage.sms(toUser, frmUser, text);
                          }
                          return result;
                        });
                      });
                  }
                  if (req.body.priority === 'Urgent') {
                    fetchMembersEmail(req.params.id).then(
                      (results) => {
                        results.map((result) => {
                          const email = result.dataValues.email,
                            subject = 'You have a new message of Urgent priority',
                            htmlMessage = `<p>${req.body.text}</p>
                            \n<a href="https://jatto-postit-app-staging.herokuapp.com">
                            View Detail</a>`;
                          sendMessage.email(email, subject, htmlMessage);
                          return result;
                        });
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
   * getMsg - retrieve messages of a group
   * 
   * @param {object} req 
   * @param {object} res 
   * 
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
      .then(allMessages => res.status(200).send(allMessages))
      .catch(error => res.status(404).send(error));
  },

  /**
   * updateReadBy
   * 
   * @param {object} req 
   * @param {object} res 
   * 
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
