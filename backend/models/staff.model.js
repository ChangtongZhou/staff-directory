const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StaffSchema = new Schema ({
    name: {type: String, required: true},
    title: {type: String, default: null},
    avatar_url: {type: String, default: null},
    sex: {type: String, default: null},
    startDate: {type: Date, default: Date.now},
    officePhone: {type: Number, default: null},
    cellPhone: {type: Number, default: null},
    SMS: {type: Number, default: null},
    manager: {type: String, default: null},
    directReports: {type: [String], default: []}
})

module.exports = mongoose.model("Staff", StaffSchema);