const { Router } = require('express')
const { body, validationResult } = require('express-validator');

const registerService = require('../services/registerService');


const router = Router();



router.post(
    '/register',
    body('username').isLength({min:5}),
    body('email').isEmail(),
    body('password').isLength({min:4}),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const registerObj = await registerService.register(
                                    req.body.username, 
                                    req.body.email,
                                    req.body.password);
        if(registerObj.failed == true){
            return res.json(registerObj);
        }
        if(registerObj.failed == false){
            console.log('Failed is false')
            return res.redirect('login')
        }
    }
)

module.exports = router;