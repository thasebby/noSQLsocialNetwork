// importing Mongoose library and 'reactionModel' from Reaction.js for the username section
const { Schema, model } = require('mongoose');
const reactionModel = require('./Reaction.js');

// create thought model: thoughtText,createdAt,username(user that created the thought),reactions(like replies)
const thoughtModel = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            // must be between 1 and 280 characters
            minlength: 1,
            maxlength: 280,
        },
        createdAt:{
            type: Date,
            // set the default value to the current time stamp
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: timestamp => new Date(timestamp).toDateString(),
        },
        username:{
            type: String,
            required: true,
        },
        reactions:[reactionModel],
    },
    {
        toJSON: {
            // the reason we set the getters to true is because we have a get method in the createdAt section
            // the reason we set the virtuals to true is because we are creating one within the Schema Settings
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Schema settings: create virtual called 'reactionCount' that retrieves the length of the thought's 'reactions' array field on a query
thoughtModel.virtual('reactionCount').get(function(){
    return this.reactions.length;
});
// create and export Thought model from 'thoughtModel'
const Thought = model('Thought',thoughtModel);
module.exports = Thought;