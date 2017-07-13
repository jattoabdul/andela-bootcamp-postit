/**
 * Groups Users Controller
 * handles every groups users related task and authentication
 */

// importing services
// import jwt from "jsonwebtoken";
import models from "../models/db";

export default {
  sendMsg(req, res) {
    return models.Messages
      .create({
        userId: req.body.userId,
        text: req.body.text,
        groupId: req.params.id,
        priority: req.body.priority
      })
      .then(message => res.status(200).send(message))
      .catch(error => res.status(404).send(error));
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
