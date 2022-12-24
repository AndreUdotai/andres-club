const mongoose = require("mongoose");
const dayjs = require('dayjs');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    post: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timeStamp: {
        type: Date,
        default: dayjs(),
    },
});

// Export model
module.exports = mongoose.model('Post', PostSchema);