const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({path: '.env'});

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

console.log('uri',uri);

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
