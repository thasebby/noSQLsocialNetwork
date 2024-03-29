//  importing from mongoose library
const { Schema, model } = require('mongoose');

// create the user model: username,email,thoughts,friends
const userModel = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate email with Mongoose matching
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
            },
        },
        // array of _id values referencing Thought model
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        // array of _id values referencing User model
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        // converting objects to JSON, specifying that virtual properties should be included when the the object is converted to JSON
        toJSON: {
            // Virtual properties are not stored directly in the database but are computed based on other properties
            virtuals: true,
        },
        // Mongoose adds a virtual 'id' field. By setting this to false prevents the '_id" field from being included 
        // in the JSON representation of the object
        id: false,
    }
);

// schema settings: create virtual called 'friendCount' that retrieves the length fo the user's 'friends' array field on a query
userModel.virtual('friendCount').get(function(){
    return this.friends.length;
});

// create and export the User model from 'userModel'
const User = model('User', userModel)
module.exports = User