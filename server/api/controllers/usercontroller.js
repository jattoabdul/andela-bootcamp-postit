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
        // create a token
          const token = jwt.sign({
            data: user[0]
          }, 'Jasabs93', { expiresIn: '30m' });

          res.status(202).send({
            token,
            message: 'successful login'
          });
          return;
        }

        res.status(404).send({
          message: 'user not found'
        });
      });
  },
  getUsers(req, res) {
    return models.Users
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

};
