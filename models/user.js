const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

// User Schema
const userSchmea = new Schema({
  username: {
    type: String,
    unique: [true, 'username is not unique'],
    required: [true, 'username is required'],
    trim: true
  },
  email: {
    type: String,
    unique: [true, 'email is not unique'],
    required: [true, 'email is required'],
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: 'Please enter a valid email address',
    },
  },
  thoughts: [
    { type: Schema.Types.ObjectId, ref: 'Thought' }
  ],
  friends: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

// Virtual to get friends count
userSchmea.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchmea);

module.exports = User;