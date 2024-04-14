const mongoose = require('mongoose');

// user schema
const UserSchema = new mongoose.Schema({
  // email field
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exists']
  },

  // password field
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique: false
  }
});

module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema);
