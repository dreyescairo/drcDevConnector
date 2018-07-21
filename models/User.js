const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  avatar: {
    type: string,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }

});


const User = mongoose.model('users', UserSchema);
module.exports = User;