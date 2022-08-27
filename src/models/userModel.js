var mongoose = require('mongoose')
var _userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    gender: {
        type: String, 
        enum: ["MALE","FEMALE", "NOT_SPECIFIED"],
        default: "NOT_SPECIFIED"
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
var userModel = mongoose.model("user", _userSchema);
module.exports = userModel;