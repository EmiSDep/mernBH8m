const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    occupation: {
        type: String
    },
    educationLevel: {
        type: String
    },
    certifications: {
        type: [String]
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    githubUrl: {
        type: String
    },
    twitterUrl: {
        type: String
    },
    bio: {
        type: String
    },
    avatar: {
      type: String
    }
});

module.exports = Profile = mongoose.model('profile', profileSchema);





/* 
  userId
  fName
  lName
  Name
  City
  State
  Avatar
  githubUrl
  twitterUrl
  bio
*/
