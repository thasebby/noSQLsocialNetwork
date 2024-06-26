// import user model from models
const { User } = require('../models');

// create user controllers: get all users, get single user by id, post new user,update user by id, delete user by id, post a new friend, delete a friend
module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const userData = await User.find();
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const userData = await User.findById(req.params.userId);
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    postNewUser: async (req, res) => {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const userData = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            else{
                res.json(userData);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req,res) => {
        try{
            const userData = await User.findByIdAndDelete(req.params.userId);

            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            else{
                res.json(userData);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    addNewFriend: async (req,res) => {
        try{
            const userData = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.body.friendId} },
                { runValidators: true, new: true }
            );

            if(!userData) {
                res.status(404).json({ message: 'User not found'});
            }
            else{
                res.json(userData);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    deleteFriend: async (req,res) => {
        try{
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true},
            );

            if(!userData) {
                return res.status(404).json({ message: 'User not found'});
            }
            
            // check if friend was removed
            const friendRemoved = !userData.friends.some(friend => friend.friendId === req.params.friendId);

            if(friendRemoved) {
                res.json({ message: 'Friend removed', userData});
            }    
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};