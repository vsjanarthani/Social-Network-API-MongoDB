const { User } = require('../model');

// UserController function with methods for specific CRUD operations
const userController = {
    // Read all users
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
                });
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
            if(userById) {
                res.status(200).json(userById);
            }
            else {
               return res.status(404).json({Msg: `No user found with the Id ${params.id}`});
            }
        }
        catch (e) {
            res.status(400).json(e);
        }

    }

};

module.exports = userController;