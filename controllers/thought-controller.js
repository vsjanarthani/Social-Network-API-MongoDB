const { User, Thought } = require('../models');

// Thought controller object with fucntions for specific CRUD operations
const thoughtController = {

    // Read/Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const allThoughts = await Thought.find({})
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .sort({ _id: -1 });
            res.status(200).json(allThoughts);
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Read/Get a single thought by its _id
    async getThoughtById({ params }, res) {
        try {
            const thoughtById = await Thought.findOne({ _id: params.id })
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 });
            if(thoughtById) {
                res.status(200).json(thoughtById);
            }
            else {
                return res.status(404).json({ Msg: `No thoughts found with the Id ${params.id}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Create/Post a new thought 
    async createThought({ body }, res){
        try {
            const newThought = await Thought.create(body);
            const updatedUser = await User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: newThought._id } },
                {new: true}
            );
            if(updatedUser) {
                res.status(200).json(updatedUser);
            }
            else {
                return res.status(404).json({ Msg: `No user found with the username ${body.username}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Update a thought by its _id
    async updateThoughtById({ params, body }, res){
        try{
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: params.id},
                body,
                {new: true}
            );
            if(updatedThought) {
                res.status(200).json(updatedThought);
            }
            else {
                return res.status(404).json({ Msg: `No thought found with the Id ${params.id}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Delete/remove a thought by its _id
    async deleteThoughtById({ params }, res){
        try {
            const deletedThought = await Thought.findOneAndDelete(
                { _id: params.id }
            );
            if(deletedThought) {

               const updatedUser = await User.findOneAndUpdate(
                    { username: deletedThought.username },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
                if (updatedUser) {
                    res.status(200).json({Updated_User: updatedUser});
                }
                else {
                    return res.status(404).json({ Msg: `No user found with the Id ${parmas.userId}` });
                }
                res.status(200).json({deleted_thought: deletedThought});
            }
            else {
                return res.status(404).json({ Msg: `No thought found with the Id ${params.id}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Create/Post a new reaction to a thought(id)'s reactions array field
    async createReaction({params, body}, res){
        try {
            const thoughtbyIdReactionAdded = await Thought.findOneAndUpdate(
                { _id: params.thoughtId},
                { $push: { reactions:body } },
                { new: true }
            )
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v');
            if (thoughtbyIdReactionAdded) {
                res.status(200).json({Updated_Thought: thoughtbyIdReactionAdded});
            }
            else {
                return res.status(404).json({ Msg: `No thought found with the Id ${params.thoughtId}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    },

    // Delete/remove a reaction by the reaction's reactionId from a thought(id)
    async deleteReactionbyId({params}, res) {
        try {
            const thoughtbyIdReactionRemoved = await Thought.findOneAndUpdate(
                { _id: params.thoughtId},
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v');
            if (thoughtbyIdReactionRemoved) {
                res.status(200).json({Updated_Thought: thoughtbyIdReactionRemoved});
            }
            else {
                return res.status(404).json({ Msg: `No thought found with the Id ${params.thoughtId}` });
            }
        }
        catch (e) {
            res.status(400).json(e);
        }
    }

};

module.exports = thoughtController;