/**
 * User Controller
 * handles every user related task and authentication
 */

// importing services
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import models from '../models';
import { sendMessage } from '../utils';

const salt = bcrypt.genSaltSync(5);
const error = {};
export const user = {
  /**
   * passwordReset - request & send password change/update link to user's email
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} info
   */
  passwordReset(req, res) {
    const email = req.body.email;
    const secret = req.body.email;
    const hash = crypto
      .createHash('sha256', secret)
      .update(Date.now().toString())
      .digest('hex');
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const expiresIn = `${date.toString().split(' ')[2]}
      :${date.toString().split(' ')[4]}`;
    if (email === undefined || email.trim() === '') {
      res.status(400).send({
        error: { message: 'email is not valid' }
      });
      return;
    }

    const subject = 'Reset Password Link',
      message = process.env.NODE_ENV === 'production' ? `Hello ${email},
      \nto reset your password, please click on
      \n<a href="https://jatto-postit-app-staging.herokuapp.com
      /#/updatepassword/${hash}">this Link</a> to reset your password`
        : `Hello ${email},
      \n to reset your password, please click on
      \n<a href="http://localhost:8080
      /#/updatepassword/${hash}">this Link</a> to reset your password`;

    models.PasswordReset
      .findOne({
        where: { email }
      }).then((response) => {
        if (response === null) {
          models.PasswordReset
            .create({
              email,
              expiresIn,
              hash
            }).then(() => {
              sendMessage.email(email, subject, message);
            });
        } else {
          response
            .update({
              hash,
              expiresIn
            }).then(() => {
              sendMessage.email(email, subject, message);
            });
        }
        if (process.env.NODE_ENV === 'test') {
          return res.status(200)
            .send({
              data: { message: 'Password Request Successful', hash }
            });
        }
        return res.status(200)
          .send({
            data: { message: 'Password Request Successful' }
          });
      });
  },

  /**
   * updatePassword - update the user's password in the database
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} data (message)
   */
  updatePassword(req, res) {
    const password = req.body.password;
    if (password === undefined || password.trim() === '') {
      res.status(400).send({
        error: { message: 'password is not defined or invalid' }
      });
      return;
    }

    const newPass = bcrypt
      .hashSync(req.body.password, salt, null);
    models.PasswordReset
      .findOne({
        where: { hash: req.params.hash }
      }).then((result) => {
        if (result) {
          const email = result.dataValues.email;
          const date = new Date();
          const now = `${date.toString().split(' ')[2]}
          :${date.toString().split(' ')[4]}`;
          if (now > result.dataValues.expiresIn) {
            res.status(400).send({
              error: { message: 'Expired or Invalid link' }
            });
            return;
          }
          return models.Users
            .update(
              { password: newPass },
              { where: { email } }
            ).then(() =>
              res.status(200).send({
                data: { message: 'Password Reset Successful' }
              })
            );
        }
        return res.status(400).send({
          error: { message: 'Hash is invalid' }
        });
      });
  },

  /**
   * signUp - create a user in the app
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} data (user)
   */
  signUp(req, res) {
    const hashedPassword = bcrypt
      .hashSync(req.body.password, salt, null);
    return models.Users
      .create({
        username: req.body.username.trim().toLowerCase(),
        email: req.body.email.trim(),
        password: hashedPassword,
        fullName: req.body.fullName.trim(),
        phoneNumber: req.body.phoneNumber.trim()
      })
      .then((newUser) => {
        const data = {};
        data.id = newUser.id;
        data.username = newUser.username;
        data.email = newUser.email;
        data.fullName = newUser.fullName;
        data.phoneNumber = newUser.phoneNumber;
        data.lastLogin = newUser.lastLogin;
        data.createdAt = newUser.createdAt;
        res.status(201).send({ data });
      })
      .catch((err) => {
        if (err.errors[0].message === 'username must be unique') {
          err = { error: { message: 'username already exists' } };
          return res.status(409).send(err);
        }
        if (err.errors[0].message === 'email must be unique') {
          err = { error: { message: 'email already exists' } };
          return res.status(409).send(err);
        }
        if (err.errors[0].message === 'Validation isEmail on email failed') {
          err = { error: { message: 'not an email' } };
          return res.status(400).send(err);
        }
        if (!err) {
          err = { error: { message: err.errors[0].message } };
          return res.status(500).send(err);
        }
      });
  },

  /**
   * authenticate - authenticate and signin a user
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} auth (token, message)
   */
  authenticate(req, res) {
    models.Users
      .findAll({
        where: {
          username: [req.body.username.toLowerCase()]
        }
      })
      .then((userObj) => {
        const password = req.body.password;
        if (userObj[0]) {
          if (bcrypt.compareSync(password, userObj[0].password)) {
            // create an authToken for the user
            const token = jwt.sign({
              data: {
                id: userObj[0].id,
                username: userObj[0].username,
                email: userObj[0].email,
                fullName: userObj[0].fullName,
                phoneNumber: userObj[0].phoneNumber
              }
            }, 'Jasabs93', { expiresIn: '24h' });
            return res
              .status(202)
              .send({
                token,
                message: `${userObj[0].username} has successfully logged in`
              });
          }
          return res.status(401)
            .send({ error: {
              message: 'invalid password and username'
            }
            });
        }
        return res.status(404)
          .send({ error: {
            message: 'username does not exist'
          }
          });
      });
  },

  /**
   * getAllUsers - get all registered users
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} user
   */
  getAllUsers(req, res) {
    return models.Users
      .findAll()
      .then(users => res.status(200).send({ users }))
      .catch(err => res.status(400).send({ err }));
  },

  /**
   * getCurrentUser - get current authenticated user
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} user - data
   */
  getCurrentUser(req, res) {
    const username = req.authToken.data.username;
    return models.Users
      .find({
        include: [{
          model: models.Groups,
          as: 'groups',
          required: false,
          attributes: ['id', 'name', 'desc', 'isArchived'],
          through: { attributes: [] }
        }],
        where: { username },
        attributes: [
          'id',
          'email',
          'username',
          'fullName',
          'lastLogin',
          'phoneNumber',
          'createdAt']
      })
      .then((currentUser) => {
        res.status(200).send({ data: currentUser });
      })
      .catch((err) => {
        error.message = err.message;
        error.success = false;
        res.status(404).send(error);
      });
  }
};
