const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/all', controller.all);
router.get('/create', controller.create);
router.get('/:id', controller.get);
router.post('/:id', controller.add);

module.exports = router;