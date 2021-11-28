const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateformat');

const ReactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: Types.ObjectId
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
    }
)

const ThoughtsSchema = new Schema({
    thoughtsText: {
        type: String,
        min: 1,
        max: 280,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}

)

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;