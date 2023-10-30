
'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

let bookSchema = new Schema({
  title: {type: String, required: true},
  decription: {type: String, required: true},
  available: {type: Boolean, required: true},
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
