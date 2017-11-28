import nodemailer from 'nodemailer';
import Jusibe from 'jusibe';

export const sendMessage = {

/**
 * Send Email Function
 * 
 * @param {string} email
 * 
 * @param {string} subject
 * 
 * @param {string} message (html)
 * 
 * @return {string} error || info
 */
  email(email, subject, message) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'jattoade@gmail.com',
        pass: 'jasabs93'
      }
    });

    const mailOptions = {
      from: 'no-reply <jattoade@gmail.com>',
      to: email,
      subject,
      html: message
    };

    transporter.sendMail(mailOptions, (errors, info) => {
      if (errors) {
        return Promise.resolve(errors);
      }
      return Promise.resolve(info);
    });
  },

  /**
 * Send SMS Function
 * 
 * @param {string} recipient
 * 
 * @param {string} sender
 * 
 * @param {string} text
 * 
 * @return {string} res || err
 */
  sms(recipient, sender, text) {
    const jusibe = new Jusibe(
      '9798320b5616e2d2b7c47c29e4c9724e',
      '5a15f721253624d3826156fcb86b244a');

    const payload = {
      to: recipient,
      from: sender,
      message: text
    };

    jusibe.sendSMS(payload)
      .then((res) => {
        Promise.resolve(res);
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }
};
