const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 16,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 16,
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 16,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    membershipStatus: {
        type: Boolean,
        default: false,
    },
    adminStatus: {
        type: Boolean,
        default: false,
    },
});

// Virtual for user's full name
UserSchema.virtual('url').get(function () {
    fullname = `${this.firstName}, ${this.lastName}`;
    return fullname;
});

// Export model
module.exports = mongoose.model('User', UserSchema);