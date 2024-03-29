// import express
const router = require('express').Router();

// import all thought controllers
const {
    getAllThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createNewReaction,
    deleteReaction,
} = require('../../controllers/thoughtControllers.js');

// /api/thought
router.route('/').get(getAllThoughts).post(createNewThought)

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createNewReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// export router
module.exports = router;