import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './api/routers/routes';

// Set up the express app
const app = express();
const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  // for serving static react client app on heroku
  app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));
  app.use('/favicon.ico',
    express.static(path.resolve(__dirname, '../../client/dist')));
} else {
  // for serving static react client app on server localhost:port
  app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
  app.use('/favicon.ico',
    express.static(path.resolve(__dirname, '../client/src/favicon.ico')));
}

app.use(logger('dev')); // Log requests to the console.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * API routes call.
*/
routes(app);

module.exports = app;
