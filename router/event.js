const Router = require("express").Router;
const eventController = require("../controllers/v1/events");

const r = Router();

const { isAuthenticated } = require("../middleware/isAuthenticated");

r.get("/", eventController.getAllEvent);
r.get("/:id", eventController.getEventById);
module.exports = r;
