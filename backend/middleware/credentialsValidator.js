const validator = require("email-validator");
const passwordValidator = require("password-validator");

exports.emailValidator = (req, res, next) => {
  validator.validate(req.body.email)
    ? next()
    : res.status(400).json({ message: "Erreur : L'adresse email rentrée n'existe pas" });
};

exports.passwordValidator = (req, res, next) => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(6, "Le mot de passe doit faire 6 caractères minimum")
    .is()
    .max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
    .has()
    .uppercase(1, "Le mot de passe doit contenir une lettre majuscule au minimum")
    .has()
    .lowercase(1, "Le mot de passe doit contenir une lettre minuscule au minimum")
    .has()
    .digits(2, "Le mot de passe doit contenir 2 nombres minimum")
    .has()
    .not()
    .spaces(1, "Le mot de passe ne peut pas contenir d'espace");

  const validate = schema.validate(req.body.password, { details: true });

  if (validate.length === 0) next();

  res.status(400).json({ message: `Erreur : ${validate[0].message}` });
};
