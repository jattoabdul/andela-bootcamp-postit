import jwt from 'jsonwebtoken';
import controllers from '../controllers';

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

  app.post("/api", (req, res) => {
    res
		.status(200)
		.send({ message: "Welcome to Andela Bootcamp PostIt Project API" });
  });

  /**
 	* NOT FOUND routes.
	*/
	// A catch-all route for anything the api(webservice) does not define.
	app.get("*", (req, res) => {
	  res
	    .status(404)
	    .send({ message: "trying to get? Nothing to see here" });
	});

	// signup API Route - for creating a user
	app.post("/api/users/signup", controllers.usercontroller.signUp);

	// signin API Route - for authenticaticating a user
	app.post('/api/users/signin', controllers.usercontroller.authenticate); 
	
	// setting a middleware to protect all other routes
	app.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, 'Jasabs93', (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: 'user not authenticated, invalid access token'
        });
        return;
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  });

  // protected routes
  // set after the above middleware to prevent access to unathourized

  // API route to get list of all users
  app.get('/api/users/', controllers.usercontroller.getUsers);

  /*
  // API route for only authenticated user to create a group
  app.post('/api/groups/', controllers.groupscontroller.createGroup);
  */

  // API route for only authenticated user to view list of all groups he belongs to
	// app.get('/api/groups/', controllers.groupscontroller.viewGroups);

  // API route for the groupadmin to add other users to the group he created
	// app.post('/api/groups/:id/user/', controllers.groupsuserscontroller.addMember);  

  // API route for authenticated user to post message into rooms he belong to	
  // app.post('/api/groups/:id/message/', controllers.messagescontroller.sendMsg);	

  // API route for authenticated users to view messages in a group
  // app.get('/api/groups/:id/messages/', controllers.groupscontroller.getMsg);


};
