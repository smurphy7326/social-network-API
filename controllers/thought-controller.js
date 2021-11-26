// thought is like comment in Pizza hunt

const { json } = require('express');
const { User, Thought } = require('../models');

const thoughtController = {
    //  get all the thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get the different thoughts by ID
    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.lof(err);
            res.sendStatus(400); // just an error with no message
        });
    },

    //Create A Thought
    // This needs to be updated
    createThought({ body }, res) {
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
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
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Delete the Thought
    deleteThought({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.id })
        .then(dbThoughtData => (dbThoughtData))
        .catch(err => res.json(err));
    },

    // Create Reaction
    createReaction({ params }, res) {
        Thought.findOneAndUpdate(
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
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId },
            { $pull: { reactions: {_id: req.params.reactionId}}},
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


module.exports = thoughtsController;