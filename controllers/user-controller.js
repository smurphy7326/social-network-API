const { User, Thought } = require('../models'); // have to work on the models after

const userController = {
    getAllUsers(req, res) { // this is to make sure that we can get all the users for the website
        User.find({})
        .populate({
            path: 'thoughts'
        })
        .select('-__v') // pizza hunt helped with this part
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    
    // To get the user by the ID to see the comments
    getUserById({params}, res) {
        User.findOne ({ _id: params.id })
            .populate({
                path:'thoughts'
            },
            {
                path: 'friends'
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.lof(err);
                res.sendStatus(400);
            });
    },

    // Create a user
    createUser( {body}, res) {
        User.create(body)
        .then(dbUserData =>res.json(dbUserData))
        .catch(err => 
            res.json(err));
    },

    // Update the User
    updateUser({ params, body}, res) {
        User.findOneAndUpdate ({ _id: params.id }, body, { new: true, runValidators: true })
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
        User.findOneAndUpdate({ _id: params.id }, {new: true})
        .then(deletedUser => {
            if(!deletedUser) {
                res.status(404).json({ message: 'No user found with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Add Friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $push: {friends: req.params.friendID}},
            {runValidators: true, new:true}
        )
        .then(dbUserData => {
            if (dbUserData) {
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
            {_id: req.params,userId},
            { $pull: {friends: req.params.friendID}},
            {runValidators: true, new: true}
        )
        .then(dbUserData => {
            if(dbUserData) {
                res.status(404).json({ message: 'No User found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }


};

module.exports = userController;