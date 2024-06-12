const mongoose = require('mongoose');

const workInfoSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    skills: [String],
    projects: [
        {
            projectName: String,
            description: String,
            role: String,
            startDate: Date,
            endDate: Date
        }
    ],
    workHistory: [
        {
            companyName: String,
            role: String,
            startDate: Date,
            endDate: Date
        }
    ]
});

module.exports = mongoose.model('WorkInfo', workInfoSchema);
