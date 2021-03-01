const uuid = require('uuid');
const bcrypt = require('bcrypt');
const fileService = require('./fileService');
const { pathToUserFile } = require('../utils/constants');

/**
 *  This function is used to register a user for the application. 
 *  It checks the json file to see if a username or password is taken already.
 *  If not then it will create a new user in the application otherwise it will return
 *  an object carrying error messages.
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 */
exports.register = async (username, email, password) => {
    const users = fileService.getFileContents(pathToUserFile);
    const checkUser = users.reduce((authObj, user) => {
        if(user.email === email) authObj.availEmail = false;
        if(user.username === username) authObj.availUsername = false;
        return authObj;
    }, {availEmail: true, availUsername: true});
    if(checkUser.availEmail === true && checkUser.availUsername === true){
        //this represents the cost factor which controls the amount of time needed to
        //  calc a single bCrypt hash. increasing the cost factor by 1 doubles the necessary time.
        //  the higher the cost factor the longer it takes hashing which makes it more difficult to
        //  brute force.
        const saltRounds = 10;
        //Im using bcrypt to hash and salt the password for storage in the json file
        //  you should NEVER store plain text passwords even if its practice.
        const successfulHash = await bcrypt.hash(password, saltRounds)
        //generate a uuid
        const newID = uuid.v4();
        //create a new user.
        const newUser = {
            uuid: newID,
            username: username,
            email: email, 
            password: successfulHash
        }
        //then write to the json file and return true.
        fileService.writeFileContents(pathToUserFile, newUser);
        return {failed: false, emailErrorMessage: '', usernameErrorMessage: ''}
    } else {
        return generateErrors(checkUser)
    }
}


const generateErrors = (checkUser) => {
    let emailError = '';
    let userNameError = ''
    if(checkUser.availEmail === false) emailError = 'Email Address is already taken!';
    if(checkUser.availEmail === false) userNameError = 'User Name is already taken!'
    return {failed: true, emailErrorMessage: emailError, usernameErrorMessage: userNameError}
}