const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const loginService = require('../services/loginService');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', {passwordWarning:"", emailWarning:"", email:"", password:""})
})

router.post(
    '/login', 
    body('email').isEmail(),
    body('password').isLength({min: 4}),
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const credentials = {
            email: req.body.email,
            password: req.body.password
        };
        const isValidUser = loginService.authenticate(credentials);
        if(isValidUser.user != null){
             // set a session value isValid
             if(!req.session.isValid){
                req.session.isValid = true;
            }
            //render dashboard
            res.redirect('dashboard')
        }
        if(isValidUser.user === null){
            // req.body.email, req.body.password
            res.render('login', {
              emailWarning:isValidUser.emailWarning, 
              passwordWarning:isValidUser.passwordWarning,
              email:req.body.email,
              password:req.body.password
             })
        }
});



module.exports = router;