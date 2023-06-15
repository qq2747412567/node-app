const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    projectname: {
        type: String,
        required: true
    },
    manname: {
        type: String,
        required: true
    },
    projectphone: {
        type: String,
        required: true
    },
    projectaccount: {
        type: String,
        required: true
    },
    teachername: {
        type: String,
        required: true
    },
    reporttime: {
        type: String,
        required: true
    },
    projecttypes: {
        type: String,
        required: true
    },

    membersaccount: {
        type: String,
        required: true
    },
    membersname: {
        type: String,
        required: true
    },
    membersprofessionalclass: {
        type: String,
        required: true
    },
    memberswhereschool: {
        type: String,
        required: true
    },
    twomembersaccount: {
        type: String,
        required: true
    },
    twomembersname: {
        type: String,
        required: true
    },
    twomembersprofessionalclass: {
        type: String,
        required: true
    },
    twomemberswhereschool: {
        type: String,
        required: true
    },
    thrmembersaccount: {
        type: String,
        required: true
    },
    thrmembersname: {
        type: String,
        required: true
    },
    thrmembersprofessionalclass: {
        type: String,
        required: true
    },
    thrmemberswhereschool: {
        type: String,
        required: true
    },

    projectintroduction: {
        type: String,
        required: true
    },
    researchobjective: {
        type: String,
        required: true
    },
    researchcontents: {
        type: String,
        required: true
    },
    researchathomeandabroad: {
        type: String,
        required: true
    },
    projectinnovate: {
        type: String,
        required: true
    },
    technologyroadmap: {
        type: String,
        required: true
    },
    scheduling: {
        type: String,
        required: true
    },

    judgment:{
        type: String,
    },

    teacheropinion: {
        type: String,
    },
    midteacheropinion: {
        type: String,
    },
    endteacheropinion: {
        type: String,
    },
    Ejudgment: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
