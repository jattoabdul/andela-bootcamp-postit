'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  /**
  	* API routes.
  */

  // base API Route
  app.get("/api", function (req, res) {
    res.status(200).send({ message: "Welcome to Andela Bootcamp PostIt Project API" });
  });

  app.post("/api", function (req, res) {
    res.status(200).send({ message: "Welcome to Andela Bootcamp PostIt Project API" });
  });

  // signup API Route - for creating a user
  app.post("/api/users/signup", _controllers2.default.usercontroller.signUp);

  // signin API Route - for authenticaticating a user
  app.post('/api/users/signin', _controllers2.default.usercontroller.authenticate);

  // setting a middleware to protect all other routes
  app.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    _jsonwebtoken2.default.verify(token, 'Jasabs93', function (err, decoded) {
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
  app.get('/api/users/', _controllers2.default.usercontroller.getUsers);

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