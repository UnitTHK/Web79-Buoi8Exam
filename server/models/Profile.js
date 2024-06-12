const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    placeOfBirth: String,
    nationality: String,
    education: [
        {
            degree: String,
            institution: String,
            startDate: Date,
            endDate: Date
        }
    ]
});

module.exports = mongoose.model('Profile', profileSchema);
