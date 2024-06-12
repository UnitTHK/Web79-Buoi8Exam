const mongoose = require('mongoose');

const additionalInfoSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    hobbies: [String],
    goals: [String]
});

module.exports = mongoose.model('AdditionalInfo', additionalInfoSchema);
