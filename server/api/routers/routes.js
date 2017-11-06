import { user, groups, groupUsers, messages } from '../controllers';
import { authenticate } from '../middlewares';

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
    user.passwordReset);

  // update password API route - for current user's new password to be updated
  app.post('/api/v1/users/reset/:hash',
    user.updatePassword);

  // signup API Route - for creating a user
  app.post('/api/v1/users/signup', user.signUp);

  // signin API Route - for authenticaticating a user
  app.post('/api/v1/users/signin', user.authenticate);

  // Protected Routes
  // API route to get list of all users
  app.get('/api/v1/users/', authenticate.user, user.getAllUsers);

  // API route to get current user and their details and groups
  app.get('/api/v1/user/', authenticate.user, user.getCurrentUser);

  // API route for only authenticated user to create a group
  app.post('/api/v1/groups/', authenticate.user, groups.createGroup);

  // API route for only authenticated user to view list 
  // of all groups he belongs to
  app.get('/api/v1/groups/', authenticate.user, groups.viewGroups);

  // API route for the groupadmin to add other users to the group he created
  app.post('/api/v1/groups/:id/user/',
    authenticate.user, groupUsers.addMember);

  // API  Route for searching users in the system and users in current group
  app.get('/api/v1/groups/:id/usersearch',
    authenticate.user, groupUsers.searchMember);

  // API route for the groupadmin/users to remove users from group he created
  app.delete('/api/v1/groups/:id/user/',
    authenticate.user, groupUsers.removeMember);

  // API route for user to view users from the current group he belongs/created
  app.get('/api/v1/groups/:id/users/',
    authenticate.user, groupUsers.viewMembers);

  // API route 4 a user 2 view users 4rm all groups
  app.get('/api/v1/groups/users/',
    authenticate.user, groupUsers.viewAllGroupMembers);

  // API route for authenticated user to post message into rooms he belong to
  // where :id is group id
  app.post('/api/v1/groups/:id/message/',
    authenticate.user, messages.sendMsg);

  // API route for authenticated user to update message readBy status in a room
  // where :id is group id and message id is passed as body
  app.post('/api/v1/groups/:id/message/read',
    authenticate.user, messages.updateReadBy);

  // API route for authenticated users to view messages in a group he belongs
  // where :id is group id and group is currently active
  app.get('/api/v1/groups/:id/messages/',
    authenticate.user, messages.getMsg);
};
