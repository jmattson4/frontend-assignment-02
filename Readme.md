# Frontend Assigment 02
### Author Jace Mattson
This assignment is for my Frontend Development class. The goal of this assignment
is to create a simple Employee Manager site that is running on Heroku.

## Quick Guide
This application uses express and node.js as the backend server. To run the application in
development mode you can run the command ``` npm run server ```. This will start a nodemon server which
will hot reload for development. In production the command to run is ``` npm run start ```. 

The application is currently 
deployed on Heroku and can be accessed with this [link](https://frontend-assignment02.herokuapp.com/). This application
is an application that was built rather quickly and for an assignment. I do not recommend using this for more than a quick guide
on how to use Express as it isnt the most secure and uses a json file as the 'database'. Rest assured though I am actually hashing 
passwords so they arent stored in plain text on the server. The encryption library I am using for that is [bcrypt](https://www.npmjs.com/package/bcrypt).

## The technologies used in this assignment: 

__Express.js__

__Node.js__

__Javascript__

__EJS__

__Heroku__