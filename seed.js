'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {

  await Book.create({
    title: 'Lord of the Flies',
    description: 'Youth violence',
    available: false,
  });
  console.log('Do the LotF exist');

  await Book.create({
    title: 'Harry Potter and the Philosopher\'s Stone',
    description: 'Youth Magic',
    available: true,
  });
  console.log('HP was added');

  await Book.create({
    title: 'A Game of Thrones',
    description: 'Adult magic and violence',
    available: false,
  });

  console.log('GoT added');

  mongoose.disconnect();
}

seed();
