// thought is like comment in Pizza hunt

const { User, Thought } = require('../models');

const thoughtController = {
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
        Thoughts,findOne({ _id: params.id })
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
            .then((dbThoughtsData) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
                    {new: true }
                );
            })
            .then(dbUserData => {
                console.log
            })
    }
}
