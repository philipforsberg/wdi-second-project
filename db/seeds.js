const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const List = require('../models/list');
const User = require('../models/user');

List.collection.drop();
User.collection.drop();
