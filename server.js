const express = require("express");
require('dotenv').config();
const app = express();
const path = require("path")
const router = express.Router();
const port = process.env.PORT||3300;
const mongoose = require("mongoose");
const cors = require("cors")
const authRoutes = require("./routes/userroutes")
const bodyparser = require("body-parser")
const session = require("express-session")
const User = require("./model/usermodel");




mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});


app.set('view engine', 'ejs');
app.use (express.static(path.join(__dirname, "assets")));//host  express static files
app.set("views", path.join(__dirname, 'views'))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use(session({
    secret: 'Dien', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

  // Example
  
  


//    app.use('/api', codeRoutes);

  app.use('/CS/verify', authRoutes) 

  app.use((req, res, next) => {
     user: User;
    res.locals.isAuthenticated = !!req.session.user; // Add to locals
    next();
});



  app.get('/', (req, res) => {
    const isAuthenticated = req.session.user ? true : false;  // Check if the user is logged in

    // Pass isAuthenticated to the template
    res.render('index', {
        isAuthenticated: isAuthenticated
    });
});
app.get('/events', (req, res) => {
    const isAuthenticated = req.session.user ? true : false;  // Check if the user is logged in

    // Pass isAuthenticated to the template
    res.render('events', {
        isAuthenticated: isAuthenticated
    });
});
app.get('/signup', (req, res) => {
    const isAuthenticated = req.session.user ? true : false;  // Check if the user is logged in

    // Pass isAuthenticated to the template
    res.render('signup', {
        isAuthenticated: isAuthenticated,
        user: req.session.user || {}  // Ensure 
    });
});

app.get('/login', (req, res) => {
    const isAuthenticated = req.session.user ? true : false;  // Check if the user is logged in

    // Pass isAuthenticated to the template
    res.render('login', {
        isAuthenticated: isAuthenticated,
        user: req.session.user || {}  // Ensure 
    });
});

app.get('/profile', (req, res) => {
    console.log(req.session); // Log session to check if it has user data

    // Use the session data to check if the user is logged in
    const isAuthenticated = req.session.user ? true : false;  // Check if user is authenticated

    // Render the page with the correct user information
    res.render('profile', {
        isAuthenticated: isAuthenticated,
        user: req.session.user || {}  // Ensure user data is passed even if not authenticated
    });
});









app.post('/CS/verify/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).send('Logout failed');
        }
        res.redirect('/');
    });
});















app.listen(port,()=>{

    console.log(`Server up and running at http://localhost:${port}/`);
});
