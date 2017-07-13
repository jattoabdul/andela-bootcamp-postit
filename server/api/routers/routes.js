import jwt from "jsonwebtoken";
import pg from "pg";
import controllers from "../controllers";

export default (app) => {
  /**
 	* API routes.
	*/

  // base API Route
  app.all("/api", (req, res) => {
    res
      .status(200)
      .send({ message: "Welcome to Andela Bootcamp PostIt Project API" });
  });

  /**
 	* HEROKU DB routes.
	*/

  // app.get("/db", (request, response) => {
  //   pg.connect(process.env.DATABASE_URL, (err, client, done) => {
  //     client.query("SELECT * FROM test_table", (err, result) => {
  //       done();
  //       if (err) {
  //         console.error(err); response.send(`Error ${err}`);
  //       } else {
  //         response.render("pages/db", { results: result.rows });
  //       }
  //     });
  //   });
  // });

  /**
 	* NOT FOUND routes.
	*/
  
  // A catch-all route for the api(webservice) not defined for get request.
  // app.get("*", (req, res) => {
  //   res
  //     .status(404)
  //     .send({ message: "trying to get? Nothing to see here" });
  // });

  // // A catch-all route for the api(webservice) not defined for post request.
  // app.post("*", (req, res) => {
  //   res
  //     .status(404)
  //     .send({ message: "trying to post? Nothing to see here" });
  // });

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
      // res.cookie("userid", decoded.id);
      res.append("user", authToken);
      next();
    });
  });

  // protected routes
  // set after the above middleware to prevent access to unathourized

  // API route to get list of all users
  app.get("/api/users/", controllers.userController.getAllUsers);

  /*
  // API route for only authenticated user to create a group
  */
  app.post("/api/groups/", controllers.groupsController.createGroup);

  // API route for only authenticated user to view list 
  // of all groups he belongs to
  app.get("/api/groups/", controllers.groupsController.viewGroups);

  // API route for the groupadmin to add other users to the group he created
  app.post("/api/groups/:id/user/",
    controllers.groupsUsersController.addMember);

  // API route for the groupadmin to remove users from the group he created
  app.delete("/api/groups/:id/user/",
    controllers.groupsUsersController.removeMember);

  // API route 4 d groupadmin 2 view users 4rm group he belongs/created
  app.get("/api/groups/:id/users/",
    controllers.groupsUsersController.viewMembers);

  // API route for authenticated user to post message into rooms he belong to	
  app.post("/api/groups/:id/message/",
    controllers.messagesController.sendMsg);

  // API route for authenticated users to view messages in a group
  app.get("/api/groups/:id/messages/", controllers.messagesController.getMsg);
};
