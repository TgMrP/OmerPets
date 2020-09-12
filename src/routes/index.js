const express = require('express');
const router = express.Router();

const pet = require('./pet');

router.get('/', (req, res) => {
  var context = req.app.notFoundPet;
  req.app.notFoundPet = null;
  res.render('index', {
    title: 'Home Page',
    context
  });
});

router.use('/pet', pet);

module.exports = router;