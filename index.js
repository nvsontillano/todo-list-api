const express = require("express");
const sequelize = require("./storage/database");
const AuthorizationRoutes = require("./authentication/routes");
const TaskRoutes = require("./tasks/routes");
const UserModel = require("./common/models/User");
const TaskModel = require("./common/models/Task");

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/ping", (_, response) => {
  const data = {
     "data": "Pong"
  };
  
  response.send(data);
});

UserModel.initialise(sequelize);
TaskModel.initialise(sequelize);
  
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/auth", AuthorizationRoutes);
    app.use("/task", TaskRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT: ", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });