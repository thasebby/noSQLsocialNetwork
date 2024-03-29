// importing and exporting User and Thought models
// not importing Reaction because it is not a model
const User = require('./User.js');
const Thought = require('./Thought.js');

module.exports = { User, Thought };