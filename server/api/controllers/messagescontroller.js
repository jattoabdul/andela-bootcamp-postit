/**
 * Messages Controller
 * handles every groups users related task and authentication
 */

// importing services
import Nexmo from "nexmo";
import nodemailer from "nodemailer";
import models from "../models/db";

let userID = 0;

const sendEmail = (email, message, priority) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "jattoade@gmail.com",
      pass: "jasabs93"
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
      return console.log(error);
    }
    console.log(`Message ${info.messageId} sent: ${info.response}`);
    return info;
  });
};

const fetchMembersEmail = groupId =>
  new Promise((resolve) => {
    models.Groups.findOne({
      where: {
        id: groupId
      },
      attributes: ["id"]
    })
      .then((group) => {
        group.getUsers({ attributes: ["id", "username", "email", "phoneNumber"] })
          .then((users) => {
            resolve(users);
          });
      });
  });

export default {
  sendMsg(req, res) {
    const userName = req.authToken.data;
    if (!req.body.text || req.body.text.trim() === "") {
      res.status(400).send({ message: "cannot send empty message" });
      return;
    }

    models.Users
      .findOne({
        where: { username: userName }
      })
      .then((user) => {
        userID = user.id;
        // console.log(`user id: ${userID}`);
        return models.Messages
          .create({
            userId: userID,
            groupId: req.params.id,
            text: req.body.text,
            priority: req.body.priority
          })
          .then((message) => {
            if (req.body.priority === "Critical") {
              fetchMembersEmail(req.params.id).then(
                (results) => {
                  console.log("========>resolved critical res", results.map(result => result.dataValues.email)
                  );
                  results.map((result) => {
                    sendEmail(result.dataValues.email,
                      `${userID}: ${req.body.text}`, "Critical");

                    // send sms notification
                    const nexmo = new Nexmo({
                      apiKey: "2a78b29f",
                      apiSecret: "acf27ddd3a3ed3b3"
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
                            console.log(err);
                          } else {
                            console.log(responseData);
                          }
                        }
                      );
                    }
                    return result;
                  });
                });
            }
            if (req.body.priority === "Urgent") {
              fetchMembersEmail(req.params.id).then(
                (results) => {
                  console.log("========>resolved urgent res", results.map(result => result.dataValues.email)
                  );
                  results.map(result =>
                    sendEmail(result.dataValues.email,
                      `${userID}: ${req.body.text}`, "Urgent"));
                });
            }
            res.status(201).send(message);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  getMsg(req, res) {
    models.Messages
      .findAll({
        where: { groupId: [req.params.id] },
        attributes: [
          "id",
          "text",
          "userId",
          "groupId",
          "priority",
          "createdAt"
        ],
      })
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(404).send(error));
  }
};
