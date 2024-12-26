






const express = require('express');
const router = express.Router();
const User = require("../model/usermodel")
const 
{
  logIn,
  signUp

   
} = require("../controller/usercontroller")




const authenticate = (req, res, next) => {
    if (req.session.user) {
        // User is authenticated
        return next();
    }
    // User is not authenticated
    res.redirect('/login'); // Redirect to login page or send an appropriate response
};

router.get("/dashboard", (req, res)=>{
    res.render('dashboard')
})
router.post('/signup', signUp)
router.post('/login', logIn)

module.exports = router