const express = require('express');
const WorkInfo = require('../models/WorkInfo');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const workInfo = new WorkInfo(req.body);
    await workInfo.save();
    res.status(201).send(workInfo);
});

router.get('/:id', authMiddleware, async (req, res) => {
    const workInfo = await WorkInfo.findById(req.params.id);
    if (!workInfo) return res.status(404).send({ message: 'Work info not found' });
    res.send(workInfo);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const workInfo = await WorkInfo.findById(req.params.id);
    if (!workInfo) return res.status(404).send({ message: 'Work info not found' });
    if (workInfo.profileId.toString() !== req.userId) return res.status(403).send({ message: 'Forbidden' });
    Object.assign(workInfo, req.body);
    await workInfo.save();
    res.send(workInfo);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const workInfo = await WorkInfo.findById(req.params.id);
    if (!workInfo) return res.status(404).send({ message: 'Work info not found' });
    if (workInfo.profileId.toString() !== req.userId) return res.status(403).send({ message: 'Forbidden' });
    await workInfo.remove();
    res.send({ message: 'Work info deleted' });
});

module.exports = router;
