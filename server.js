'use strict';
console.log('back end connect test');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5555;
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(process.env.DB_URL);


const Book = require('./models/book.js');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/', (request, res) => res.status(200).send('Server...'));
app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);

async function putBooks(req, res, next) {
  try {
    let id = req.params.id;
    console.log('id is:', id)
    let dataUpdate = req.body;
    let updatedBook = await Book.findByIdAndUpdate(id, dataUpdate, { new: true, overwrite: true });
    res.send(updatedBook);

  } catch (error) {
    next(error);

  }
}





async function postBooks(req, res, next) {
  console.log(req, 'post book working');
  try {
    let createBook = await Book.create(req.body);
    res.status(200).send(createBook);
  } catch (error) {
    next(error);
  }
}


async function deleteBooks(req, res, next) {
  try {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.status(200).send('Book found!');
  } catch (error) {
    next(error);
  }
}






app.get('/books', getBooks);

async function getBooks(req, res, next) {
  try {
    console.log('we made it to the get Books');
    let dataBaseResults = await Book.find();
    console.log('DATA?', dataBaseResults);
    res.status(200).send(dataBaseResults);
  } catch (error) {
    next(error);
  }
}

app.use((error, request, response) => {
  response.status(500).send(error);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
