const { User, Thought } = require('../models');

// UserController object with fucntions for specific CRUD operations
const userController = {
    // Read/Get all users
    async getAllUsers(req, res) {
        try {
            const allUsers = await User.find({})
                .populate({
                    path: "thoughts",
                    select: "-__v",
                })
                .populate({
                    path: "friends",
                    select: "-__v",
                })
                .select('-__v')
                .sort({ _id: -1 });
            res.status(200).json(allUsers)
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Read a single user by its _id and populated thought and friend data
    async getUserById({ params }, res) {
        try {
            const userById = await User.findOne({ _id: params.id })
                .populate({
                    path: "thoughts",
                    select: "-__v",
                })
                .populate({
                    path: "friends",
                    select: "-__v",
                });
            if (userById) {
                res.status(200).json(userById);
            }
            else {
                return res.status(404).json({ Msg: `No user found with the Id ${params.id}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Create a new user
    async createUser({ body }, res) {
        try {
            const newUser = await User.create(body);
            res.status(200).json(newUser);
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Update a user by its Id
    async updateUserById({ params, body }, res) {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: params.id }, body, {
                new: true
            });
            if (updatedUser) {
                res.status(200).json(updatedUser);
            }
            else {
                return res.status(404).json({ Msg: `No user found with the Id ${params.id}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Delete a user by its Id
    async deleteUserById({ params }, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: params.id });
            if (deletedUser) {
                await Thought.deleteMany({ userId: params.id });
                res.status(200).json({ delted_User: deletedUser });
            }
            else {
                return res.status(404).json({ Msg: `No user found with the Id ${params.id}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Create/add a new friend to a user's(id) friend list
    async addFriend({ params }, res) {
        try {
            const userByIdFriendAdded = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true }
            )
                .populate({
                    path: "friends",
                    select: "-__v",
                });
            if (userByIdFriendAdded) {
                res.status(200).json(userByIdFriendAdded);
            }
            else {
                return res.status(404).json({ Msg: `No user found with the Id ${params.userId}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Delete/remove a friend from a user's(id) friend list
    async deleteFriend({ params }, res) {
        try {
            const userByIdFriendDeleted = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            )
                .populate({
                    path: "friends",
                    select: "-__v",
                });
            if (userByIdFriendDeleted) {
                res.status(200).json(userByIdFriendDeleted);
            }
            else {
                return res.status(404).json({ Msg: `No user found with the Id ${params.userId}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
};

module.exports = userController;