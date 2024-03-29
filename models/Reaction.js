// Schema settings: NOT A MODEL, will be used as the 'reaction' field's subdocument schema int he 'Thought' model
// importing mongoose library
const { Schema, Types } = require('mongoose');

// create reaction model: reactionId,reactionBody,username,createdAt
const reactionModel = new Schema(
    {
        reactionId:{
            // using Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            // default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toDateString(),
        },
    },
    {
        toJSON:{
            getters:true,
        },
        id: false,
    }
);

// no need to create a model, just export it
module.exports = reactionModel;
