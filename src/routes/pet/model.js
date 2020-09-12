const mongoose = require('mongoose');

const isRequire = false;

const PetSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: isRequire
  },
  ownerName: {
    type: String,
    required: isRequire
  },
  ownerPhone: {
    type: String,
    required: isRequire
  },
  email: {
    type: String,
    required: isRequire
  },
  medicalHistory: {
    type: String,
    required: isRequire
  },
  id: {
    type: String,
    required: isRequire,
    unique: true
  },
  phone: {
    type: String,
    required: isRequire
  },
}, {
  timestamps: true
});

PetSchema.methods.Validate = function (obj) {
  const Joi = require('joi');
  const schema = Joi.object({
    id: Joi.string(),
    petName: Joi.string()
      .pattern(new RegExp('^[a-zA-Z ]{3,30}$'))
      .min(2)
      .max(30)
      .required()
      .label('Pet Name')
      .messages({
        'string.base': "{#label} should be a type of 'text'",
        'string.empty': '{#label} cannot be an empty field',
        'string min': '{#label} should have a minimum lenght of {#limit}',
        'string.max': '{#label} should have a maximum length of {#max}',
        'any.required': '{#label} is required field'
      }),
    ownerName: Joi.string()
      .pattern(new RegExp('^[a-zA-Z ]{3,30}$'))
      .min(3)
      .max(30)
      .required()
      .label('Owner name')
      .messages({
        'string.base': "{#label} should be a type of 'text'",
        'string.empty': '{#label} cannot be an empty field',
        'string.min': '{#label} should have a minimum length of {#limit}',
        'string.max': '{#label} should have a minimum length of {#max}',
        'any.required': '{#label} is a required field',
      }),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required()
      .label('Email')
      .messages({
        'string.base': '{#label} should be a valid email',
        'string.email': '{#label} should be a valid email',
        'string.empty': '{#label} cannot be an empty field',
        'any.required': '{#label} is a required field',
      }),
    phone: Joi.string()
      .pattern(
        new RegExp(
          /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/
        )
      )
      .required()
      .label('Phone Number')
      .messages({
        'string.base': '{#label} should be a valid phone number',
        'string.pattern.base': '{#label} should be a valid phone number',
        'string.empty': '{#label} cannot be an empty field',
        'any.required': '{#label} is a required field',
      }),
  });

  const valid = schema.validate(obj, {
    abortEarly: false
  });

  return valid && valid.error ? valid : false;
}

module.exports = mongoose.model('Pet', PetSchema);