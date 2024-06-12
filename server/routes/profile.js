const express = require('express');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).send(profile);
});

router.get('/:id', authMiddleware, async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send({ message: 'Profile not found' });
    res.send(profile);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send({ message: 'Profile not found' });
    if (profile._id.toString() !== req.userId) return res.status(403).send({ message: 'Forbidden' });
    Object.assign(profile, req.body);
    await profile.save();
    res.send(profile);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send({ message: 'Profile not found' });
    if (profile._id.toString() !== req.userId) return res.status(403).send({ message: 'No U' });
    await profile.remove();
    res.send({ message: 'Profile deleted' });
});

module.exports = router;
