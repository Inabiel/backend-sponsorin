const Router = require("express").Router;
const authController = require("../controllers/v1/auth");

const {
  userValidationRules,
  loginValidationRules,
  validate,
} = require("../middleware/validator");

const r = Router();

r.post(
  "/register",
  userValidationRules(),
  validate,
  authController.verifySignUp
);
r.post("/login", loginValidationRules(), validate, authController.verifyLogIn);

module.exports = r;
