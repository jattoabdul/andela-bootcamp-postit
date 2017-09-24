import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './api/routers/routes';

// Set up the express app
const app = express();


// for serving static react client app on heroku
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client/dist')));
}

// for serving static react client app on server localhost:port
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Default routes.
 */
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send({ message: 'Welcome to the beginning of nothingness.' });
// });

/**
 * API routes call.
*/

routes(app);

module.exports = app;
