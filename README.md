#### My Andela Bootcamp LOS24 Postit Project

[![Build Status](https://travis-ci.org/jattoabdul/andela-bootcamp-postit.png?branch=master)](https://travis-ci.org/jattoabdul/andela-bootcamp-postit)
[![Coverage Status](https://coveralls.io/repos/github/jattoabdul/andela-bootcamp-postit/badge.png?branch=master)](https://coveralls.io/github/jattoabdul/andela-bootcamp-postit)
[![Code Climate](https://codeclimate.com/github/jattoabdul/andela-bootcamp-postit.png)](https://codeclimate.com/github/jattoabdul/andela-bootcamp-postit)

**About PostIt**

It's a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once - a broadcast message. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

View the Production App Here:
[https://jatto-postit-app.herokuapp.com/]

View the Development Version Here:
[https://jatto-postit-app-staging.herokuapp.com/]

Access the API Here:
[https://jatto-postit-app.herokuapp.com/api/v1]

view a Template Demo of the UI Here:
[https://postit-c5714.firebaseapp.com/]

#### Core Technology Stacks
> - Front-end: React/Redux + SASS/Materialize
> - Back-end: Expressjs + Sequelize
> - Libraries: jsonwebtoken, es6, Babel-Node, Gulp, eslint, Mocha/Chai + chai-http, Enzyme
> - System Dependencies: Node + Postgres

#### Folder Structure
> - `client`: contains React/Redux implementation of the frontend
> - `server`: contains the project API developed in Node/express + Sequelize/postgres 
> - `template`: contains the UI design with HTML/CSS/BOOTSTRAP
> - `tests`: contains both the client and server test files in their respective folders

#### API Documentation

Access to API endpoints are restricted based on the authorization token and roles assigned to the user. This token is generated when a new user signs up, and when a returning user signs in.

For more information of how to use the API, visit the Documentation [here](https://app.apiary.io/postit3).

#### Getting Started
> **Installation**
> - Clone the repo `git clone https://github.com/jattoabdul/andela-bootcamp-postit.git folderName`
> - Ensure you have installed [NodeJS](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/download/)
> - Navigate into the app's root directory: `cd folderName`
> - Setup PostgresSql on your local machine or Use [ElephantSql](https://www.elephantsql.com/)
> - Run `$ npm install && bower install` to install all dependencies
> - Install sequelize-cli, Run `$ npm install -g sequelize-cli` (note: sudo install on ubuntu or MAC)
> - Create a .env file in the root directory using the sample .env.sample file
> - setup your db according to settings in `server/api/config/config.json`
> - then run `$ sequelize db:migrate`
> - Run tests to ensure the app is not broken: `npm test`

> **How to Demo/Run the App**
> - To start the App in development: `npm run start:dev`
> - To start the App in a production environment run: `npm start`

> **Viewing The Templates**
>- To compile scss, run `$ gulp`

>- To start, run: `$ gulp watch`
   
>- Open the `template/index.html` in you favourite browser (preferably chrome)

#### Available Functionalities on Client

>- Signup
>- Signin
>- View groups on sidemenu
>- View messages in respective group's message board
>- Post messages to groups
>- View members of a group
>- Add user to group
>- Create new group
>- Search for registered users

#### CONTRIBUTING
This project is open for contributions. All contributions must adhere to the Airbnb styleguide.

- [Javascript](http://airbnb.io/javascript/)
- [React](https://github.com/airbnb/javascript/tree/master/react)

**To get started:**
- Raise an Issue [here](https://github.com/jattoabdul/andela-bootcamp-postit/issues)
- Fork the repository
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Added some features'`
- Push to the branch: `git push origin my-new-feature`
- Submit a PR (pull request) to the [develop branch](https://github.com/jattoabdul/andela-bootcamp-postit/tree/develop)

#### FAQ
>- view Frequently Asked Questions [Here](https://github.com/jattoabdul/andela-bootcamp-postit/wiki/FAQ's)

#### LICENSE

>- [MIT License](https://github.com/jattoabdul/andela-bootcamp-postit/blob/master/LICENSE)

#### Author(s)
>- [Aminujatto Abdulqahhar](https://github.com/jattoabdul)
