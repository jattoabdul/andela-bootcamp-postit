/**
 * Groups Users Controller
 * handles every groups users related task and authentication
 */

// importing services
// import jwt from "jsonwebtoken";
import models from "../models/db";

export default {
  addMember(req, res) {
    return models.GroupsUsers
      .create({
        UsersId: req.body.userId,
        GroupsId: req.params.id,
        isAdmin: "0"
      })
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  viewMembers(req, res) {
    return models.GroupsUsers
      .findAll()
      .then((members) => {
        res.status(200).send(members);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  removeMember(req, res) {
    return models.GroupsUsers
      .destroy({
        where: {
          UsersId: req.body.UsersId,
          GroupsId: req.params.id
        }
      })
      .then((result) => {
        res.status(202).send(result);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};
