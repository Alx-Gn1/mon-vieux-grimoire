const Joi = require("joi");

exports.authSchema = Joi.object({ token: Joi.string(), userId: Joi.string().alphanum() });

exports.credentialsSchema = Joi.object({
  password: Joi.string().alphanum().min(6).max(32).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "fr"] } }),
});

exports.bookIdSchema = Joi.object({ id: Joi.string().alphanum() });

exports.bookSchema = Joi.object({
  userId: Joi.string().alphanum(),
  title: Joi.string().max(64).required(),
  author: Joi.string().alphanum().max(32).required(),
  year: Joi.number().integer().required(),
  genre: Joi.string().alphanum().max(32).required(),
  ratings: Joi.array()
    .items(Joi.object({ userId: Joi.string().alphanum(), grade: Joi.number().integer() }))
    .required(),
  averageRating: Joi.number().required(),
  imageURL: Joi.string(),
});
