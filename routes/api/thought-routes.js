const router = require('express').Router();
const { getAllThoughts, getThoughtById,
    createThought, updateThoughtById, 
    deleteThoughtById, createReaction,
    deleteReactionbyId } = require('../../controllers/thought-controller');

// Setting up get and post requests for thoughts at api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought);

// Setting up all put, delete and get requests by thoughts id at /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById);

// Post request for creating new reaction at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

// Delete request for removing reaction by id
// at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReactionbyId);

module.exports = router;