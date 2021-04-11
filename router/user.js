const Router = require("express").Router;
const userController = require("../controllers/v1/user");

const r = Router();

const { isAuthenticated } = require("../middleware/isAuthenticated");

r.get("/:id", userController.getUserById);
r.put("/setnewpassword", isAuthenticated, userController.changePassword);
r.put("/setrole", isAuthenticated, userController.editRole);
r.put("/setdesc", isAuthenticated, userController.editDeskripi);

module.exports = r;
