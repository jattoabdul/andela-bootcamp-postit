/**
 * User Controller
 * handles every user related task and authentication
 */

// importing services
import jwt from "jsonwebtoken";
import models from "../models/db";

export default {
  // Signup Users (create user and save to db)
  signUp(req, res) {
    return models.Users
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber
      })
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  authenticate(req, res) {
    models.Users
      .findAll({
        where: {
          username: [req.body.username],
          password: [req.body.password]
        }
      })
      .then((user) => {
        if (user[0]) {
          // create an authToken for the user
          const token = jwt.sign({
            data: user[0].id
          }, "Jasabs93", { expiresIn: "2h" });

          res
            .status(202)
            .send({
              token,
              message: `${user[0].id} has successfully logged in`
            });
          return;
        }

        res.status(401)
          .send({
            message: "username not found, please register"
          });
      });
  },
  getAllUsers(req, res) {
    return models.Users
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

};
