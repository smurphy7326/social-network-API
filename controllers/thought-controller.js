const { User, Thoughts } = require('../models');

const thoughtController = {
    //  get all the thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'reactions'
        })
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
            res.sendStatus(400); // just an error with no message
        });
    },

    //Create A Thought
    // This needs to be updated
    createThought({ body }, res) {
        Thoughts.create(body)
            .then(({ dbThoughtsData }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: dbThoughtsData._id } },
                    {new: true }
                );
            })
            .then(dbUserData => {
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
            { _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtsData => { // because we are trying to update the thought data that was just put and not the user data
            if(dbThoughtsData) {
                res.status(404).json({ message: 'No Thought found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Delete the Thought
    deleteThought({ params }, res) {
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
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts found with this id'});
                return;
            }
            res.json(dbThoughtData);
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
        .then(dbThoughtData => {
            if(dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts found with this ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};


module.exports = thoughtController;