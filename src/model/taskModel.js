const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const taskSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "Users",
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    task: {
        type: String,
        required: true,
        trim: true
    },

    Date: {
        type: Date,
        required: true,
        trim: true
    },

    status: {
        type: String,
        required: true,
        trim: true,
        enum:['Completed','Incomplete']
    },

    isDeleted: {
        type: Boolean,
        Default: false
    }
})
module.exports = mongoose.model("task", taskSchema);