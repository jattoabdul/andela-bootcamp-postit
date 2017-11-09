import jwt from 'jsonwebtoken';

export const authenticate = {

  /**
 * authenticate user Function
 * 
 * @param {object} req
 * @param {object} res
 * @param {func} next
 * 
 * @return {void}
 */
  user(req, res, next) {
    const token = req.body.token || req.query.token ||
    req.headers['x-access-token'];
    jwt.verify(token, 'Jasabs93', (err, authToken) => {
      if (err) {
        res.status(401)
          .send({
            message: 'sorry, user not authenticated, invalid access token'
          });
        return;
      }
      // if authenticated with auth token, 
      // save auth token and to request for use in other routes
      req.authToken = authToken;
      authToken = JSON.stringify(authToken);
      res.append('user', authToken);
      next();
    });
  }
};
