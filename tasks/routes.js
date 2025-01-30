const router = require("express").Router();
const TaskController = require("./controllers/TaskController");
const AuthenticationCheckMiddleware = require("../common/middlewares/AuthenticationCheckMiddleware");
const TaskPermissionMiddleware = require("../common/middlewares/TaskPermissionMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const createTaskPayload = require("./schemas/createTaskPayload");
const updateTaskPayload = require("./schemas/updateTaskPayload");
const reorderTaskPayload = require("./schemas/reorderTaskPayload");

router.get(
  "/",
  [
    AuthenticationCheckMiddleware.isAuthenticated
  ],
  TaskController.getAllTasks
);

router.post(
  "/",
  [
    AuthenticationCheckMiddleware.isAuthenticated,
    SchemaValidationMiddleware.verify(createTaskPayload),
  ],
  TaskController.createTask
);

router.patch(
  "/:taskId",
  [
    AuthenticationCheckMiddleware.isAuthenticated,
    TaskPermissionMiddleware.hasPermission,
    SchemaValidationMiddleware.verify(updateTaskPayload),
  ],
  TaskController.updateTask
);

router.patch(
  "/:taskId/position",
  [
    AuthenticationCheckMiddleware.isAuthenticated,
    TaskPermissionMiddleware.hasPermission,
    SchemaValidationMiddleware.verify(reorderTaskPayload),
  ],
  TaskController.reorderTask
);

router.delete(
  "/:taskId",
  [
    AuthenticationCheckMiddleware.isAuthenticated, 
    TaskPermissionMiddleware.hasPermission,
  ],
  TaskController.deleteTask
);

module.exports = router;