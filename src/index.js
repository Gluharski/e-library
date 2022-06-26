const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

const booksController = require('./controllers/books');
const Book = require('./model/Book');
const dataService = require('./services/dataService');

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
	const createdBook = new Book({
		title: req.body.title,
		author: req.body.author,
		description: req.body.description
	})

	await createdBook.save();

	res.redirect('/books');
});

app.get('/books/:id', async (req, res) => {
	const book = await Book.findById({ _id: req.params.id }).lean();

	res.render('details', { book });
});

app.get('/about', (req, res) => {
	res.render('about');
});

// delete book
app.get('/delete/:id', async (req, res) => {
	try {
		await dataService.deleteBook(req.params.id);
		res.redirect('/books');
	} catch (error) {
		res.status(404).send({ error: 'You cannot delete this book!' });
	}
});

app.listen(5000, console.log('Server is listening on port 5000'));