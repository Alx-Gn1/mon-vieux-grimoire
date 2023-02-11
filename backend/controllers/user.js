const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { credentialsSchema } = require("../utils/schemas/joiSchemas");

exports.signup = (req, res, next) => {
  if (!credentialsSchema.validate({ password: req.body.password, email: req.body.email }))
    res.status(400).json({ error: "Mot de passe/Email invalide" });
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({ email: req.body.email, password: hash });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  if (!credentialsSchema.validate({ password: req.body.password, email: req.body.email }))
    res.status(400).json({ error: "Mot de passe/Email invalide" });
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "identifiant/mot de passe incorrect" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (valid === false) {
              res.status(401).json({ message: "identifiant/mot de passe incorrect" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.jsonWebToken_PRIVATE, { expiresIn: "24h" }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
