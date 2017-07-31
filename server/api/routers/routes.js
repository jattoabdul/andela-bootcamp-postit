import jwt from "jsonwebtoken";
import controllers from "../controllers";

export default (app) => {
  /**
 	* API routes.
	*/

  // base API Route
  app.get("/api", (req, res) => {
    res
      .status(200)
      .send({ message: "Welcome to Andela Bootcamp PostIt Project API" });
  });


  // signup API Route - for creating a user
  app.post("/api/users/signup", controllers.userController.signUp);

  // signin API Route - for authenticaticating a user
  app.post("/api/users/signin", controllers.userController.authenticate);


  let token;

  // setting a middleware to protect all other routes
  app.use((req, res, next) => {
    token = req.body.token || req.query.token ||
      req.headers["x-access-token"];
    jwt.verify(token, "Jasabs93", (err, authToken) => {
      if (err) {
        res.status(401)
          .send({
            message: "sorry, user not authenticated, invalid access token"
          });
        return;
      }
      // if authenticated with auth token, 
      // save auth token and to request for use in other routes
      req.authToken = authToken;
      authToken = JSON.stringify(authToken);
      // testing for saving user data
      res.append("user", authToken);
      next();
    });
  });

  // protected routes
  // set after the above middleware to prevent access to unathourized

  // API route to get list of all users
  app.get("/api/users/", controllers.userController.getAllUsers);

  // API route to get current user and their details and groups
  app.get("/api/user/", controllers.userController.getCurrentUser);

  // API route for only authenticated user to create a group
  app.post("/api/groups/", controllers.groupsController.createGroup);

  // API route for only authenticated user to view list 
  // of all groups he belongs to
  app.get("/api/groups/", controllers.groupsController.viewGroups);

  // API route for the groupadmin to add other users to the group he created
  // where :id is group id
  app.post("/api/groups/:id/user/",
    controllers.groupsUsersController.addMember);

  // API route for the groupadmin/users to remove users from group he created
  // where :id is group id
  app.delete("/api/groups/:id/user/",
    controllers.groupsUsersController.removeMember);

  // API route 4 user 2 view users 4rm the current group he belongs/created
  // where :id is group id
  app.get("/api/groups/:id/users/",
    controllers.groupsUsersController.viewMembers);

  // API route 4 a user 2 view users 4rm all groups
  app.get("/api/groups/users/",
    controllers.groupsUsersController.viewAllGroupMembers);

  // API route for authenticated user to post message into rooms he belong to
  // where :id is group id	
  app.post("/api/groups/:id/message/",
    controllers.messagesController.sendMsg);

  // API route for authenticated users to view messages in a group he belongs
  // where :id is group id and group is currently active
  app.get("/api/groups/:id/messages/", controllers.messagesController.getMsg);
};
