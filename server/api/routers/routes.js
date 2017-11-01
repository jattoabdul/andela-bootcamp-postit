import jwt from 'jsonwebtoken';
import controllers from '../controllers';

export default (app) => {
/**
* API routes.
*/

  // base API Route
  app.get('/api/v1', (req, res) => {
    res
      .status(200)
      .send({ message: 'Welcome to Andela Bootcamp PostIt Project API' });
  });

  // reset password API route - for current user to request password reset link
  app.post('/api/v1/users/reset/request',
    controllers.user.passwordReset);

  // update password API route - for current user's new password to be updated
  app.post('/api/v1/users/reset/:hash',
    controllers.user.updatePassword);

  // signup API Route - for creating a user
  app.post('/api/v1/users/signup', controllers.user.signUp);

  // signin API Route - for authenticaticating a user
  app.post('/api/v1/users/signin', controllers.user.authenticate);

  let token;

  // setting a middleware to protect all other routes
  app.use((req, res, next) => {
    token = req.body.token || req.query.token ||
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
      // testing for saving user data
      res.append('user', authToken);
      next();
    });
  });

  // protected routes
  // set after the above middleware to prevent access to unathourized

  // API route to get list of all users
  app.get('/api/v1/users/', controllers.user.getAllUsers);

  // API route to get current user and their details and groups
  app.get('/api/v1/user/', controllers.user.getCurrentUser);

  // API route for only authenticated user to create a group
  app.post('/api/v1/groups/', controllers.groups.createGroup);

  // API route for only authenticated user to view list 
  // of all groups he belongs to
  app.get('/api/v1/groups/', controllers.groups.viewGroups);

  // API route for the groupadmin to add other users to the group he created
  app.post('/api/v1/groups/:id/user/',
    controllers.groupUsers.addMember);

  // API  Route for searching users in the system and users in current group
  app.get('/api/v1/groups/:id/usersearch',
    controllers.groupUsers.searchMember);

  // API route for the groupadmin/users to remove users from group he created
  app.delete('/api/v1/groups/:id/user/',
    controllers.groupUsers.removeMember);

  // API route for user to view users from the current group he/she belongs/created
  app.get('/api/v1/groups/:id/users/',
    controllers.groupUsers.viewMembers);

  // API route 4 a user 2 view users 4rm all groups
  app.get('/api/v1/groups/users/',
    controllers.groupUsers.viewAllGroupMembers);

  // API route for authenticated user to post message into rooms he belong to
  // where :id is group id
  app.post('/api/v1/groups/:id/message/',
    controllers.messages.sendMsg);

  // API route for authenticated user to update message readBy status in a room
  // where :id is group id and message id is passed as body
  app.post('/api/v1/groups/:id/message/read',
    controllers.messages.updateReadBy);

  // API route for authenticated users to view messages in a group he belongs
  // where :id is group id and group is currently active
  app.get('/api/v1/groups/:id/messages/',
    controllers.messages.getMsg);
};
