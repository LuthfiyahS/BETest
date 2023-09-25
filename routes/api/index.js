const { Router } = require('express');
const {
    internalServerError,
    notFoundDefault
} = require('../../controllers/error');
const membersRouter = require('./members');
const booksRouter = require('./books');
const transactionsRouter = require('./transactions');

const router = Router();

router.use('/members', membersRouter);
router.use('/books', booksRouter);
router.use('/transactions', transactionsRouter);

router.use(notFoundDefault);
router.use(internalServerError);

module.exports = router;
