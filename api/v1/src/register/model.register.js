const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("register", registerSchema);