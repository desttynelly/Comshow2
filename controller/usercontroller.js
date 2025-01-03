



const User = require("../model/usermodel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const streamifier  = require("streamifier");
const jwt = require('jsonwebtoken');

//function to login
const logIn = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ status: "Failed", message: "invalid email or password" });
        }

        

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'Adain', { expiresIn: '1h' }); // 1 hour expiration
        // const token = user.generateAuthToken();
        //res.status(200).json({ status: "Success" });
        // Store user information in the session
    
                req.session.user = {
                    id: user._id,
                    email: user.email,
                    fullname: user.fullname, 
                    Username: user.username,
                    
                   
                    
                   
                    
                    // Add other fields as needed
                };

                const isAuthenticated = req.session.user ? true : false; 

                // Send success response
                res.render("profile", {
                  isAuthenticated: isAuthenticated,
                  user: req.session.user || {}  // Ensure 
              });
                // res.status(200).json({
                //     status: "Success",
                //     message: "Login successful",
                //     user: {
                //         id: user._id,
                //         email: user.email,
                //         fullname: user.fullname,
                //         phoneNumber: user.phoneNumber,
                //         country: user.country,
                //         accountNumber: user.accountNumber,
                //         accountBank: user.accountBank,
                //         notificationsCount: user.notificationsCount,
                //         referralCount:user.referralCount,
                //         referredUsers: user.referredUsers,
                //         points:user.points,
                //         accountName:user.accountName

                //     }
                // });
        
                // Redirect to the dashboard
                // res.redirect('/dashboard');
    } catch (error) {
        console.error("Error during login:", error);

        // Handle errors and ensure only one response
        if (!res.headersSent) {
            res.status(500).json({ status: "Failed", message: error.message });
        }   
    }
    
    
};



const signUp = async (req, res) => {
    try {
      const { fullname, username, email, password} = req.body;
  
      if (!fullname || !username || !email || !password) {
        return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }
  
      let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  
      // If an image file is provided
      if (req.file) {
        // Wrap the Cloudinary upload in a promise
       
          const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                return res.status(500).send('Error uploading image to Cloudinary');
            }
           imageURL = result.secure_url;

        
             
           createuser()

          });
          
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
      }else{
        createuser()
    
        
      }

      async function createuser(){

         // Create a new user with the provided data and the image URL if available
      const user = new User({
        fullname,
        username,
        email,
        password,
      });


        try {
            await user.save();
            // Generate a JWT token
            const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

            req.session.user = {
                id: user._id,
                email: user.email,
                fullname: user.fullname, 
                Username: user.username,
               
                
                // Add other fields as needed
            };
            const isAuthenticated = req.session.user ? true : false; 

            res.render("profile", {
              isAuthenticated: isAuthenticated,
              user: req.session.user || {}  // Ensure 
          });
            // res.status(200).json({
            //     status: "Success",
            //     message: "Login successful",
            //     token,
            //     user: {
            //         id: user._id,
            //         email: user.email,
            //         fullname: user.fullname,
            //         phoneNumber: user.phoneNumber,
            //         country: user.country,
            
            //         notificationsCount: user.notificationsCount,
            //         referralCount: user.referralCount,
            //         referredUsers: user.referredUsers,
            //         points: user.points,
            //         accountName: user.accountName
            //     }
            // });
            
        } catch (error) {
            console.error('Error saving product:', error);
                res.status(500).send('Error saving product');
        }
      }
  
     
  
      
  
     
    } catch (error) {
      console.error("Error during signup:", error);
  
      // Handle errors and ensure only one response
      if (!res.headersSent) {
        res.status(500).json({ status: "Failed", message: error.message });
      }
    }

    

 
};



module.exports =
{

    signUp, 
    logIn, 
 
};