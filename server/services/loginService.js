

const fileService = require('./fileService');

exports.authenticate = (credential) => {
    const { email, password } = { ...credential };
    const users = fileService.getFileContents('../data/users.json');
    const authUser = users.reduce((authObj, user) => {
        if (user.email === email) {
            authObj.validEmail = true;
        }
        if (user.password === password) {
            authObj.validPassword = true;
        }
        if (authObj.validEmail === true && authObj.validPassword === true) {
            authObj.user = user;
        }

        return authObj;
    }, {validEmail:false, validPassword:false, user:null})

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







