const router = require("express").Router();

const AuthenticationController = require("./controllers/AuthenticationController");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const signupPayload = require("./schemas/signupPayload");
const loginPayload = require("./schemas/loginPayload");

router.post(
  "/signup",
  [SchemaValidationMiddleware.verify(signupPayload)],
  AuthenticationController.signup
);

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginPayload)],
  AuthenticationController.login
);

module.exports = router;