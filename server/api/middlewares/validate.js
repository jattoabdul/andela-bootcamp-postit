export const validate = {
  /**
   * validate user input Function on signUp form
   * 
   * @param {object} req
   * @param {object} res
   * @param {func} next
   * 
   * @return {void}
   */
  signUp(req, res, next) {
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

    if (req.body.username.length < 6) {
      return res.status(400)
        .send({
          error: {
            message: 'username must be atleast 6 characters or more'
          }
        });
    }

    if (req.body.password.length < 6) {
      return res.status(400)
        .send({ error: {
          message: 'password must be 8 characters or more'
        }
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
    next();
  },

  /**
   * validate user input Function on signIn form
   * 
   * @param {object} req
   * @param {object} res
   * @param {func} next
   * 
   * @return {void}
   */
  signIn(req, res, next) {
    if (!req.body.username || req.body.username.trim() === '') {
      return res.status(400)
        .send({
          error: { message: 'Username is required' }
        });
    }
    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
        .send({
          error: { message: 'Password is required' }
        });
    }
    if (req.body.username.length < 6) {
      return res.status(400)
        .send({
          error: {
            message: 'Please provide a username with atleast 6 characters.'
          }
        });
    }
    if (req.body.password.length < 6) {
      return res.status(400)
        .send({ error: {
          message: 'password must be 8 characters or more'
        }
        });
    }
    next();
  }
};
