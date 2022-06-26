const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

const booksController = require('./controllers/books');

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
	extended: false
}));
app.use('/books', booksController);

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/create', (req, res) => {
	res.render('create');
});

app.post('/create', (req, res) => {
	console.log(req.body);

	res.redirect('/books');
});

app.listen(5000, console.log('Server is listening on port 5000'));