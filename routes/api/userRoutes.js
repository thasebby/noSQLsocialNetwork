// import express
const router = require('express').Router();

// import all user controllers
const {
    getAllUsers,
    getSingleUser,
    postNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
} = require('../../controllers/userControllers.js');

// /api/user
router.route('/').get(getAllUsers).post(postNewUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);

// export router
module.exports = router;