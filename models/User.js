const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    // username for the website, 
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    // Email required for the website
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid Email address']
    },
    // Thoughts or like the comments
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    // Friends
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.export = User;