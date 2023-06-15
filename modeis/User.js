const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//创造一个Schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    },
    memberschool:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    identity: {
        type: String,
        require: true
    },
    date: {
        type:Date,
        default:Date.now
    },
})

module.exports = User = mongoose.model("users",UserSchema);