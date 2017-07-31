/**
 * User Controller
 * handles every user related task and authentication
 */

// importing services
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
import models from "../models/db";

const salt = bcrypt.genSaltSync(5);
const error = {};
export default {
  // Signup Users (create user and save to db)
  signUp(req, res) {
    if (!req.body.email || req.body.email.trim() === "") {
      return res.status(400)
        .send({
          error: { message: "email cannot be empty" }
        });
    }

    if (!req.body.username || req.body.username.trim() === "") {
      return res.status(400)
        .send({
          error: { message: "username cannot be empty" }
        });
    }

    if (!req.body.password || req.body.password.trim() === "") {
      return res.status(400)
        .send({
          error: { message: "password cannot be empty" }
        });
    }

    if (!req.body.fullName || req.body.fullName.trim() === "") {
      return res.status(400)
        .send({
          error: { message: "fullName not provided" }
        });
    }

    if (!req.body.phoneNumber || req.body.phoneNumber.trim() === "") {
      return res.status(400)
        .send({
          error: { message: "phone cannot be empty" }
        });
    }

    const hashedPassword = bcrypt
      .hashSync(req.body.password, salt, null);
    return models.Users
      .create({
        username: req.body.username.trim(),
        email: req.body.email.trim(),
        password: hashedPassword,
        fullName: req.body.fullName.trim(),
        phoneNumber: req.body.phoneNumber.trim()
      })
      .then((user) => {
        const data = {};
        data.id = user.id;
        data.username = user.username;
        data.email = user.email;
        data.fullName = user.fullName;
        data.phoneNumber = user.phoneNumber;
        data.lastLogin = user.lastLogin;
        data.createdAt = user.createdAt;
        res.status(201).send({ data });
      })
      .catch((err) => {
        if (err.errors[0].message === "username must be unique") {
          error.err = { message: "username already exists" };
        }
        if (err.errors[0].message === "email must be unique") {
          error.err = { message: "email already exists" };
        }
        if (err.errors[0].message === "Validation isEmail on email failed") {
          error.err = { message: "not an email" };
        }
        if (!error.err) {
          error.err = { message: err.errors[0].message };
        }
        res.status(400).send(error); // {error, data: req.body}
      });
  },
  authenticate(req, res) {
    models.Users
      .findAll({
        where: {
          username: [req.body.username]
        }
      })
      .then((user) => {
        const password = req.body.password;
        if (user[0]) {
          if (bcrypt.hashSync(password, salt) === user[0].password) {
            // create an authToken for the user
            const token = jwt.sign({
              data: user[0].username
            }, "Jasabs93", { expiresIn: "24h" });
            res
              .status(202)
              .send({
                token,
                message: `${user[0].username} has successfully logged in`,
                data: req.body
              });
          } else {
            res.status(401)
              .send({
                message: "invalid password",
                data: req.body
              });
          }
          return;
        }

        res.status(404)
          .send({
            message: "username does not exist",
            data: req.body
          });
      });
  },
  getAllUsers(req, res) {
    return models.Users
      .findAll()
      .then(users => res.status(200).send({ users }))
      .catch(err => res.status(400).send({ err }));
  },
  getCurrentUser(req, res) {
    const username = req.authToken.data;
    console.log(username);
    // const id = req.authToken.data;
    // console.log(id);
    return models.Users
      .find({
        include: [{
          model: models.Groups,
          as: "groups",
          required: false,
          attributes: ["id", "name", "desc", "isArchived"],
          through: { attributes: [] }
        }],
        where: { username },
        attributes: ["id", "email", "username", "fullName", "lastLogin", "phoneNumber", "createdAt"]
      })
      .then((user) => {
        res.status(200).send({ data: user });
      })
      .catch((err) => {
        error.message = err.message;
        error.success = false;
        res.status(400).send(error);
      });
  }
};
