const { Router } = require('express');
const router = Router();



router.get('/dashboard', (req, res)=>{
    if(req.session.isValid){
      res.render('dashboard')
    }else{
     res.redirect('/login')
    }
})


module.exports = router;