const { User, Thoughts } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    
    // To get the user by the ID to see the comments
    getUserById({params}, res) {
        User.findOne({ _id: params.id })
            .populate([{
                path:'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            }
        ])
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData =>res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // Update the User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Delete User 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // Add Friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: {friends: params.friendId}},
            {runValidators: true, new:true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Delete Friend

    deleteFriend({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: {friends: params.friendId}},
            {runValidators: true, new: true}
        )
        .then((dbUserData) => {
            // console.log("dbUserData", dbUserData);
            // console.log('doc', doc);
            // console.log(Object.keys(dbUserData))
            // console.log(Object.entries(dbUserData)[2][1])
            //     console.log('dbUserData exists')
            // if (dbUserData !== null && !Object.entries(dbUserData)[2][1]) {
            //     res.status(404).json({ message: 'No User found with this ID'});
            //     return
            // }
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err: err.message})
        })
    }

};

module.exports = userController;