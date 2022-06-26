const Books = require('../model/Book');

// update
// exports.updateBook = () => Books.updateOne({})

exports.deleteBook = (id) => Books.findByIdAndDelete(id); // method ot mongoose model