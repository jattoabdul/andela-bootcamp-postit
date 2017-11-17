import jwt from 'jsonwebtoken';
import models from '../models';

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
  },

  /**
   * isGroupAdmin of a group methhod
   * 
   * @param {object} req
 * @param {object} res
 * @param {func} next
   * 
   * @return {void}
   */
  isGroupAdmin(req, res, next) {
    const userId = req.authToken.data.id;
    const groupId = req.params.id || req.params.groupId;
    models.GroupsUsers
      .find({
        where: {
          userId,
          groupId,
          isAdmin: '1'
        }
      }).then((user) => {
        if (!user) {
          return res.status(401)
            .send({
              message: 'User is not an admin'
            });
        }
        next();
      });
  }
};
