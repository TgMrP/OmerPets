const model = require('./model');
const helpers = require('../../helpers');

async function canEdit(id) {
  const pet = await model.findOne({
    id
  }).lean();
  if (!pet || pet && pet.petName) {
    return false;
  }
  return true;
}

module.exports = {
  all: async (req, res, next) => {
    try {
      const pets = await model.find({}, '-_id -createdAt -updatedAt -__v').lean();
      pets.map((p) => {
        p.url = 'https://' + req.hostname + '/pet/' + p.id;
        return p;
      });
      res.json(pets);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    for (let index = 0; index < 10; index++) {
      const newPet = {
        id: helpers.makeid(8),
      };
      try {
        await model.create(newPet);
      } catch (error) {
        next(error);
      }
    }
    res.json('added');

  },

  get: async (req, res, next) => {
    const id = (req.params.id.toUpperCase());
    try {
      const pet = await model.findOne({
        id
      }).lean();
      if (pet && pet.petName) {
        res.render('pet/viewPet', {
          pet,
          title: `View Pet - ${pet.petName}`
        });
      } else if (pet) {
        res.render('pet/addPet', {
          title: 'Add Pet ID',
          value: {},
          errors: {}
        });
      } else {
        req.app.notFoundPet = id;
        res.redirect('/');
      }
    } catch (error) {
      next(error);
    }
  },

  add: async (req, res, next) => {
    const id = (req.params.id.toUpperCase());
    const pet = new model(req.body);

    req.body.id = id;

    const err = pet.Validate(req.body);

    if (!await canEdit(id)) {
      res.json('NotFound');
    } else if (err) {
      res.render('pet/addPet', {
        title: 'Add Pet ID',
        value: req.body,
        errors: helpers.errByType(err.error)
      });
    } else {
      try {
        await model.findOneAndUpdate({
          id
        }, req.body);
        res.redirect(`/pet/${id}`);
      } catch (error) {
        next(error);
      }
    }
  }
};