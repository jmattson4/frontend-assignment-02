const bcrypt = require('bcrypt');

const fileService = require('./fileService');

exports.authenticate = async (credential) => {
    const { email, password } = { ...credential };
    const users = fileService.getFileContents('../data/users.json');
    let authObj = {validEmail:false, validPassword:false, user:null};
    //had to use a forloop rather than a reduce 
    //  due to calling an async function from inside the loop
    for (let index = 0; index < users.length; index++) {
        const hashCompare = await bcrypt.compare(password, users[index].password);
        if (hashCompare) {
            authObj.validPassword = true;
        }
        if (users[index].email === email) {
            authObj.validEmail = true;
        }
        if (authObj.validEmail === true && authObj.validPassword === true) {
            authObj.user = users[index];
        }
    }
    const authUser = authObj;
    const auth0 = authUser.user ? {user:authUser.user} : formatErrors(authUser);
    return auth0;
}

const formatErrors = function (authObj) {
    let emailWarning = '';
    let passwordWarning = '';

    if (authObj.validEmail === false) {
        emailWarning = "couldn't find user with this email address"
    }

    if (authObj.validPassword === false) {
        passwordWarning = "the password doesn't match this email address"
    }

    return { user: null, emailWarning, passwordWarning }
}







