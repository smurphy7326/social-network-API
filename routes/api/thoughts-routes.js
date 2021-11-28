const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thought-controller.js')

// when you are trying to write a thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// api thoughts with the id associated with it, when you can get put and delete
router
    .route('/id')
    .get(getThoughtsById)
    .put(updateThought)
    .delete(deleteThought)

// Reactions with the ID 
router
    .route('./:thoughtId/reactions')
    .post(createReaction)

// Delete different reactions
router
    .route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)
    .delete(deleteReaction)

module.exports = router;

