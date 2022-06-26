const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
});

// 1st method
// BookSchema.methods.info = function () {
// 	return `${this.title} - ${this.description}`
// }

// error validator
// BookSchema.path('title').validate(function () {
// 	return this.title >= 2 && this.title <= 20;
// }, 'Movie title should be less than 20 characters and more than 2!');

// 2nd method
// BookSchema.method('info', function () {
// 	// stuff
// });

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;