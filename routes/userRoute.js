const express = require("express");
const router = express.Router();
const User = require("../models/userModel")

router.post("/register", async(req, res) => {
    const {name , email , password} = req.body

    const newUser = new User({name , email , password})
    
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json("Email already registered");
        }
        newUser.save();
        res.send('User Registered successfully');
    } catch (error) {
        return res.status(400).json("User registration failed");
    }

});


router.post("/login", async(req, res) => {
    const {email , password} = req.body

    try {
        
        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name , 
                email : user[0].email, 
                isAdmin : user[0].isAdmin, 
                _id : user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json('Invalid credentials');
        }

    } catch (error) {
           return res.status(400).json('Something went wrong');
    }
  
});


router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User deleted Successfully')
    } catch (error) {
        return res.status(400).json('Failed to delete user');
    }

});



module.exports = router