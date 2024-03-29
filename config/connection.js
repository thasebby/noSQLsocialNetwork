// importing mongoose library
const { connect, connection } = require('mongoose');

// This line defines a connection string used to connect to a MongoDB database
const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkDB';

// initiating connection
connect(connectionString);

// this line exports the default connection object created by Mongoose
module.exports = connection;