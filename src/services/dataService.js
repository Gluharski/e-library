const Books = require('../model/Book');

exports.editBook = (id, data) => Books.updateOne({ _id: id }, {$set: data});
exports.updateBook = (id, data) => Books.updateOne({_id: id}, {$set: data});
exports.deleteBook = (id) => Books.findByIdAndDelete(id);
exports.getOne = (id) => Books.findById(id).lean();