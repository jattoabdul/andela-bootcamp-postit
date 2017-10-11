/**
 * User Controller
 * handles every user related task and authentication
 */

// importing services
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import models from '../models/db';

const salt = bcrypt.genSaltSync(5);
const error = {};
export default {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
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
        data: { error: { message: 'email is not valid' } }
      });
      return;
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: 'jattoade@gmail.com',
        pass: 'jasabs93'
      }
    });

    const mailOptions = {
      from: 'no-reply <jattoade@gmail.com>',
      to: email,
      subject: 'Reset Password Link',
      html: `Hello ${email}, to reset your password, please click on
       \n<a href="http://localhost:8080/#/updatepassword/${hash}">this Link</a>
        to reset your password`
    };

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
              transporter.sendMail(mailOptions, (errors, info) => {
                if (errors) {
                  res.status(503).send({
                    data: { error: { message: errors } }
                  });
                } else {
                  res.status(200).send({ data: { message: info } });
                }
              });
            });
        } else {
          response
            .update({
              hash,
              expiresIn
            }).then(() => {
              transporter.sendMail(mailOptions, (errors, info) => {
                if (errors) {
                  res.status(503).send({
                    data: { error: { message: errors } }
                  });
                } else {
                  res.status(200).send({ data: { message: info } });
                }
              });
            });
        }
      });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} data
   */
  updatePassword(req, res) {
    const newPass = bcrypt
      .hashSync(req.body.password, salt, null);
    models.PasswordReset
      .findOne({
        where: { hash: req.params.hash }
      }).then((result) => {
        const email = result.dataValues.email;
        const date = new Date();
        const now = `${date.toString().split(' ')[2]}
        :${date.toString().split(' ')[4]}`;
        if (now > result.dataValues.expiresIn) {
          res.status(200).send({
            data: { error: { message: 'Expired or Invalid link' } }
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
      });
  },

  // Signup Users (create user and save to db)
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} data (user)
   */
  signUp(req, res) {
    if (!req.body.email || req.body.email.trim() === '') {
      return res.status(400)
        .send({
          error: { message: 'email cannot be empty' }
        });
    }

    if (!req.body.username || req.body.username.trim() === '') {
      return res.status(400)
        .send({
          error: { message: 'username cannot be empty' }
        });
    }

    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
        .send({
          error: { message: 'password cannot be empty' }
        });
    }

    if (!req.body.fullName || req.body.fullName.trim() === '') {
      return res.status(400)
        .send({
          error: { message: 'fullName not provided' }
        });
    }

    if (!req.body.phoneNumber || req.body.phoneNumber.trim() === '') {
      return res.status(400)
        .send({
          error: { message: 'phone cannot be empty' }
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
        if (err.errors[0].message === 'username must be unique') {
          error.err = { message: 'username already exists' };
        }
        if (err.errors[0].message === 'email must be unique') {
          error.err = { message: 'email already exists' };
        }
        if (err.errors[0].message === 'Validation isEmail on email failed') {
          error.err = { message: 'not an email' };
        }
        if (!error.err) {
          error.err = { message: err.errors[0].message };
        }
        res.status(400).send(error); // {error, data: req.body}
      });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} auth (token, message)
   */
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
          if (bcrypt.compareSync(password, user[0].password)) {
            // create an authToken for the user
            const token = jwt.sign({
              data: {
                id: user[0].id,
                username: user[0].username,
                email: user[0].email,
                fullName: user[0].fullName,
                phoneNumber: user[0].phoneNumber
              }
            }, 'Jasabs93', { expiresIn: '24h' });
            res
              .status(202)
              .send({
                token,
                message: `${user[0].username} has successfully logged in`
              });
          } else {
            res.status(401)
              .send({
                message: 'invalid password'
              });
          }
          return;
        }

        res.status(404)
          .send({
            message: 'username does not exist'
          });
      });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} user
   */
  getAllUsers(req, res) {
    return models.Users
      .findAll()
      .then(users => res.status(200).send({ users }))
      .catch(err => res.status(400).send({ err }));
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
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
