require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  }).catch(err => {
    console.error('Mongo connection error', err);
  });
