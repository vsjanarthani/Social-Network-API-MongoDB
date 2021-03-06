const { Schema, model, Types } = require('mongoose');

// Reactions Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        get: (date) => {
            return date.toLocaleDateString();
        }
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

// Thoughts Schema
const thoughtSchmea = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'thought text is required'],
        minLenght: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: new Date(),
        get: (date) => {
            return date.toLocaleDateString();
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual to get reactions count
thoughtSchmea.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


const Thought = model('Thought', thoughtSchmea);

module.exports = Thought;