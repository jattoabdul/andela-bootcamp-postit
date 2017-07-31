/**
 * Groups Users Controller
 * handles every groups users related task and authentication
 */

// importing services
import models from "../models/db";

let userID = 0;
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
          .then(message => res.status(201).send(message))
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
