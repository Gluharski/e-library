const router = require('express').Router();
const Books  = require('../model/Book');

router.get('/', async (req, res) => {
	const books = await Books.find().lean();
	
	res.render('books', { books });
});

module.exports = router;