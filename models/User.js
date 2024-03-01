const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  GoogleID: {
    type: String
  },
  GitHubID: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model('users', UserSchema);