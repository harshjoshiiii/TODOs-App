const express = require('express');
const router = express.Router();
const User = require("../models/userModel"); 
// GET Route
router.get('/', async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json(userData); 
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "User not found" });
    }
});

//get one 
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const userData = await User.findById({_id:id});
        res.status(200).json(userData); 
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "User not found" });
    }
});

// POST Route
router.post('/', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const userAdded = await User.create({ name, email, age });
        res.status(201).json(userAdded);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "User not added" });
    }
});


//delete
router.delete('/:id', async (req, res) => {
    
    const {id} = req.params;
    try {
        const userData = await User.findByIdAndDelete({_id:id});
        res.status(200).json(userData); 
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "User not found" });
    }
});

//update
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true, // Returns the updated document
            runValidators: true // Ensures validation rules are applied
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;  
