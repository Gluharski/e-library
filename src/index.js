const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

const booksController = require('./controllers/books');
const Book = require('./model/Book');

const url = 'mongodb://localhost:27017/books';
mongoose.connect(url)
	.then(() => {
		console.log('DB Connected!')
	})
	.catch((error) => {
		console.log(error);
	});

app.engine('hbs', hbs.engine({
	extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(express.urlencoded({
	extended: true
}));
app.use('/books', booksController);

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/create', (req, res) => {
	res.render('create');
});

app.post('/create', async (req, res) => {
	// create new Book
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		description: req.body.description
	})

	const savedBook = await book.save();
	console.log(savedBook);
	
	res.redirect('/books');
});

app.get('/books/:id', async (req, res) => {
	const book = await Book.findOne({ _id: req.params.id }).lean();

	res.render('details', { book });
});

app.listen(5000, console.log('Server is listening on port 5000'));