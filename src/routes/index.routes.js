const usersRouter = require("./users.routes");

function routes(app) {
  app.use("/api/user", usersRouter);
}

module.exports = routes;
