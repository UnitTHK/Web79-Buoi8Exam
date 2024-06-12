const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const workInfoRoutes = require('./routes/workInfo');
const additionalInfoRoutes = require('./routes/additionalInfo');

app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);
app.use('/workInfos', workInfoRoutes);
app.use('/additionalInfos', additionalInfoRoutes);

const PORT =  3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
