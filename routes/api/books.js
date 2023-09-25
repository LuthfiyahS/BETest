const { Router } = require('express');
const { findAll, findExistingBooks} = require('../../controllers/books');
const { methodNotAllowed } = require('../../controllers/error');

const router = Router();

router.route('/').get(findAll).all(methodNotAllowed);

router.route('/exist').get(findExistingBooks).all(methodNotAllowed);

module.exports = router;
