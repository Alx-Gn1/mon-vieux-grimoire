const jwt = require("jsonwebtoken");
const { authSchema } = require("../utils/schemas/joiSchemas");

module.exports = (req, res, next) => {
  try {
    console.log();
    if (!authSchema.validate(req.headers.authorization)) res.status(400).json({ error: "Invalid userId or userToken" });
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jsonWebToken_PRIVATE);
    const userId = decodedToken.userId;
    if (!authSchema.validate({ userId })) res.status(400).json({ error: "Invalid userId or userToken" });
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
