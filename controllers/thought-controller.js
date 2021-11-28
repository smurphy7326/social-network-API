const { User, Thoughts } = require('../models');

const thoughtsController = {
    //  get all the thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get the different thoughts by ID
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //Create A Thought
    createThought({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } }, // this links it to the _id that is trying to create a thought
                    {new: true }
                );
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if(dbUserData) {
                    res.status(404).json({ message: 'No thoughts found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Update the thoughts
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true })
        .then(dbThoughtData => { // changed from thoughts to thought because it is a single thought
            if(dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Delete the Thought
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id })
        .then(dbThoughtsData => (dbThoughtsData))
        .catch(err => res.json(err));
    },

    // Create Reaction
    createReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            {runValidators: true, new: true}
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No Thoughts found with this id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    // Delete Reaction
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId },
            { $pull: { reactions: {_id: params.reactionId}}},
            { new: true }
        )
        .then(dbThoughtsData => {
            if(dbThoughtsData) {
                res.status(404).json({ message: 'No Thoughts found with this ID'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    }
};


module.exports = thoughtsController;