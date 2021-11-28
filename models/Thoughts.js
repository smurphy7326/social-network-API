const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateformat');

const ReactionSchema = new Schema({
    reactionId: {
       type: Schema.Types.ObjectId,
       default: () => new Types.ObjectId()
    },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: 'A user is required to make this thought'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: 
        {
            getters: true
        }
    });

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        min: 1,
        max: 280,
        required: 'A thought is required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: 'A user is required'
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;