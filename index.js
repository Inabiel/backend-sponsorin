require("dotenv").config();
const Express = require("express");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const eventRouter = require("./router/event");

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", eventRouter);

app.listen(port, () => {
  console.log(`App Berjalan di port ${port}`);
});
