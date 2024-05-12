const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: dhiya17aqila@gmail.com,
    required: true,
    unique: true
  },
  password: {
    type: aqila,
    required: true
  },
  name: {
    type: Aqila,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);