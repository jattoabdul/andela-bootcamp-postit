# My Andela Bootcamp LOS24 Postit Project

**BADGES**
[![Build Status](https://travis-ci.org/jattoabdul/andela-bootcamp-postit.png?branch=master)](https://travis-ci.org/jattoabdul/andela-bootcamp-postit)
[![Coverage Status](https://coveralls.io/repos/github/jattoabdul/andela-bootcamp-postit/badge.png?branch=master)](https://coveralls.io/github/jattoabdul/andela-bootcamp-postit)
[![Code Climate](https://codeclimate.com/github/jattoabdul/andela-bootcamp-postit.png)](https://codeclimate.com/github/jattoabdul/andela-bootcamp-postit)

**ABOUT POSTIT**
Is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

View the API Here[https://jatto-postit-app.herokuapp.com/]

view a Demo of the UI Here[https://postit-c5714.firebaseapp.com/]

**TECHNOLOGIES**
> - Front-end: React/Redux + SASS (To be Implemented)
> - Back-end: Node/Expressjs + Sequelize/Postgres
> - Libraries: jsonwebtoken, es6, Babel-Node, Gulp, eslint, Mocha/Chai + chai-http

**FOLDER STRUCTURE**
> - client: to contain React/Redux implementation of the frontend
> - server: contains the project API developed in Node/express + Sequelize/postgres 
> - template: contains the UI design with HTML/CSS/BOOTSTRAP


**INSTALLATION**
> - Clone the repo
> - Run `npm install && bower install` to install dependencies
> - Setup Postgres
> - Install sequelize-cli, Run `npm install -g sequelize-cli` (note: sudo install on ubuntu or MAC)
> - setup your db according to settings in `server/api/config/config.json`
> - then run `$ sequelize db:migrate`

**HOW TO DEMO**

# SERVER
-Backend API's are in the server folder

>- To run server, Run
   `$ npm run start`

>- To run server in development, Run
   `$ npm run start:dev`

>- Open PostMan and test url end points

>- To run server test, Run
   `$ npm run test:dev`

>- To run eslint test, Run
   `$ npm run eslint`

**API URL ENDPOINT**
>- To SignUp
  `http://heroku-app/api/users/signup`


# TEMPLATES
-All user interfaces design are in the template folder

>- To compile scss, run
   `$ gulp`

>- To run In Development Mode, run
   `$ gulp watch`
   

-Open the `index.html` in you favourite browser (preferably chrome)


# CLIENT
- React Front End Are in the client folder
>- In Development

>- **Author: Aminujatto Abdulqahhar**