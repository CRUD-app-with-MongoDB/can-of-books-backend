'use strict';
console.log('back end connect test');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL);

app.get('/', (request, response) => {
  response.status(200).send('Hello from the server');
});

const Book = require('./models/book');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/books', getBooks);

async function getBooks(req, res, next){
  try {
    console.log('we made it to the get Books');
    let dataBaseResults = await Book.find();
    console.log('DATA?',dataBaseResults);
    res.status(200).send(dataBaseResults);
  } catch (error) {
    next(error);
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
