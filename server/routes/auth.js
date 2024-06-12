const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/create', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = new Profile({});
    await profile.save();
    const user = new User({ username, password: hashedPassword, profileId: profile._id });
    await user.save();
    res.status(201).send({ message: 'User created' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ message: 'User not found' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).send({ message: 'Invalid password' });
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
});

router.post('/logout', (req, res) => {
    res.send({ message: 'Logout successful' });
});

module.exports = router;
