/**
 * Groups Controller
 * handles every groups related task and authentication
 */

// importing services
// import jwt from "jsonwebtoken";
import models from "../models/db";

export default {
  createGroup(req, res) {
    return models.Groups
      .create({
        name: req.body.name,
        desc: req.body.desc,
        isArchived: req.body.isArchived,
        UsersId: req.body.UsersId
      })
      .then((group) => {
        if (group) {
          models.GroupsUsers
            .create({
              isAdmin: "1",
              GroupsId: group.GroupsId,
              UsersId: group.UsersId
            })
            .then(() => {
              res.status(201).send({
                group,
                message: "group created successfully"
              });
            });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  viewGroups(req, res) {
    return models.Groups
      .findAll()
      .then((groups) => res.status(200).send(groups))
      .catch(error => res.status(400).send(error));
  }
};
