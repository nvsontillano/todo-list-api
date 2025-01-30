const TaskModel = require("../models/Task");

module.exports = {
  hasPermission: async (req, res, next) => {
    const { user: { userId }, params: { taskId } } = req;

    const task = await TaskModel.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        error: {
          message: 'Task not found.'
        }
      });
    }

    if (task.ownerId !== userId) {
      return res.status(403).json({
        status: false,
        error: {
          message: 'You do not have permission to access this task.'
        }
      });
    }

    next();
  }
}