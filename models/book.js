const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
          },
    author: {
      type: String
    },
    published:{
        type:Boolean
    }
  });
  
  const Book = mongoose.model('Book', bookSchema);
  
  module.exports = Book;