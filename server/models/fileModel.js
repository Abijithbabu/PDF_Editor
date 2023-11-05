const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
        unique: true,
    },
    size: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Files", fileSchema);
