const router = require('express').Router();
const { getAllUsers, getUserById,
    createUser, updateUserById,
    deleteUserById, addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Setting up all get and post routes at api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// Setting up all put, delete and get request by id at api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

// Setting up all post and delete friend request by user id 
// at /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;