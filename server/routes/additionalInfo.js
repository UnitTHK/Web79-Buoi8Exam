const express = require('express');
const AdditionalInfo = require('../models/AdditionalInfo');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const additionalInfo = new AdditionalInfo(req.body);
    await additionalInfo.save();
    res.status(201).send(additionalInfo);
});

router.get('/:id', authMiddleware, async (req, res) => {
    const additionalInfo = await AdditionalInfo.findById(req.params.id);
    if (!additionalInfo) return res.status(404).send({ message: 'Additional info not found' });
    res.send(additionalInfo);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const additionalInfo = await AdditionalInfo.findById(req.params.id);
    if (!additionalInfo) return res.status(404).send({ message: 'Additional info not found' });
    if (additionalInfo.profileId.toString() !== req.userId) return res.status(403).send({ message: 'Forbidden' });
    Object.assign(additionalInfo, req.body);
    await additionalInfo.save();
    res.send(additionalInfo);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const additionalInfo = await AdditionalInfo.findById(req.params.id);
    if (!additionalInfo) return res.status(404).send({ message: 'Additional info not found' });
    if (additionalInfo.profileId.toString() !== req.userId) return res.status(403).send({ message: 'Forbidden' });
    await additionalInfo.remove();
    res.send({ message: 'Additional info deleted' });
});

module.exports = router;
