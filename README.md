# My Andela Bootcamp LOS24 Postit Project

**BADGES**
[![Build Status](https://travis-ci.org/jattoabdul/andela-bootcamp-postit.png?branch=master)](https://travis-ci.org/jattoabdul/andela-bootcamp-postit)
[![Coverage Status](https://coveralls.io/repos/github/jattoabdul/andela-bootcamp-postit/badge.png?branch=master)](https://coveralls.io/github/jattoabdul/andela-bootcamp-postit)
[![Code Climate](https://codeclimate.com/github/jattoabdul/andela-bootcamp-postit.png)](https://codeclimate.com/github/jattoabdul/andela-bootcamp-postit)

**ABOUT POSTIT**
Is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once - a broadcast message. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

View the Beast-Mode App Here[https://jatto-postit-app.herokuapp.com/]
View the Development Version Here[https://jatto-postit-app-staging.herokuapp.com/]

Access the API Here[https://jatto-postit-app.herokuapp.com/api/v1]

view a Template Demo of the UI Here[https://postit-c5714.firebaseapp.com/]

**TECHNOLOGIES**
> - Front-end: React/Redux + SASS/Materialize
> - Back-end: Expressjs + Sequelize
> - Libraries: jsonwebtoken, es6, Babel-Node, Gulp, eslint, Mocha/Chai + chai-http, Enzyme
> - System Dependencies: Node + Postgres
**FOLDER STRUCTURE**
> - client: to contain React/Redux implementation of the frontend
> - server: contains the project API developed in Node/express + Sequelize/postgres 
> - template: contains the UI design with HTML/CSS/BOOTSTRAP

**API DOCUMENTATION**
>- [https://app.apiary.io/postit3]

**INSTALLATION**
> - Clone the repo
> - Run `$ npm install && bower install` to install dependencies
> - Setup Postgres
> - Install sequelize-cli, Run `$ npm install -g sequelize-cli` (note: sudo install on ubuntu or MAC)
> - setup your db according to settings in `server/api/config/config.json`
> - then run `$ sequelize db:migrate`

**HOW TO DEMO/RUN THE APP**

# SERVER
-Backend API's are in the server folder

>- To run server in production, Run
   `$ npm run start`

>- To run server in development, Run
   `$ npm run server:dev`

>- Open PostMan and test url end points

>- To run server test, Run
   `$ npm run test:server`

>- To run eslint test, Run
   `$ npm run eslint`

# TEMPLATES
-All user interfaces design are in the template folder

>- To compile scss, run
   `$ gulp`

>- To run In Development Mode, run
   `$ gulp watch`
   

-Open the `index.html` in you favourite browser (preferably chrome)


# CLIENT
- React Front End Are in the client folder
>- To run client, Run
   `$ npm client:dev`

>- To run client test, Run
   `$ npm test:client`

>- To build client for production, Run
   `$ npm run build`
    `$ git add client/dist`
    `$ git commit -m "Adding 'build' to source control"`
    `$ git push origin <branch>`

# RUN APP IN BEAST MODE
- To run both client and server in Development on local machine
    `$ npm run start:dev` // proxy activated

- To run full app in Production
    `$ npm start` // proxy activated

- App Deployed Online With Heroku
    [https://jatto-postit-app.herokuapp.com/]

**FAQ**
>- view Frequently Asked Questions Here[https://github.com/jattoabdul/andela-bootcamp-postit/wiki/FAQ's]

**CONTRIBUTING**
- Fork the repository
- Create your feature branch: git checkout -b my-new-feature
- Commit your changes: git commit -am 'Add some feature'
- Push to the branch: git push origin my-new-feature
- Submit a PR (pull request)

**LICENSE**
>- MIT License[https://github.com/jattoabdul/andela-bootcamp-postit/blob/master/LICENSE]

>- **Author: Aminujatto Abdulqahhar**
