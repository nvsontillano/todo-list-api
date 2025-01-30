const TaskModel = require("../../common/models/Task");
const sequelize = require("../../storage/database");
const { Sequelize } = require("sequelize");

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const filter = {
        ownerId: req.user.userId,
      };

      const tasks = await TaskModel.getAllTasks(filter, false);
      
      return res.status(200).json({
        status: true,
        data: tasks,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }
  },

  createTask: async (req, res) => {
    try {
      let { body: payload } = req;

      // Get the last task of the user
      const filter = {
        ownerId: req.user.userId,
      };
      const order = [["position", "DESC"]];
      const lastTask = await TaskModel.getTask(filter, order);

      // Set the position of the new task
      const newTaskPosition = lastTask ? (lastTask.position + 1) : 1
      const task = { 
        ...payload, 
        position: newTaskPosition, 
        ownerId: req.user.userId 
      };

      // Create the task
      const newTask = await TaskModel.createTask(task);

      return res.status(200).json({
        status: true,
        data: newTask.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    };
  },

  updateTask: async (req, res) => {
    try {
      const {
        params: { taskId },
        body: payload,
      } = req;
      const filter = {
        id: taskId,
      };

      await TaskModel.updateTask(filter, payload);

      const task = await TaskModel.getTask({ id: taskId });

      return res.status(200).json({
        status: true,
        data: task.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }
  },

  reorderTask: async (req, res) => {
    try {
      const {
        params: { taskId },
        body: payload,
      } = req;
      const userId = req.user.userId;

      // Get the current and new positions of the task
      const task = await TaskModel.getTask({ id: taskId });
      const taskOldPosition = task.position;
      const taskNewPosition = taskOldPosition + payload.positionDelta;

      // If the task is already at the new position, return the task
      if (taskOldPosition === taskNewPosition) {
        return res.status(200).json({
          status: true,
          data: task.toJSON(),
        });
      }

      // Get all tasks that need to be updated aside from the current task
      let lowerPosition, higherPosition;
      if (taskOldPosition > taskNewPosition) {
        lowerPosition = taskNewPosition;
        higherPosition = taskOldPosition - 1;
      } else {
        lowerPosition = taskOldPosition + 1;
        higherPosition = taskNewPosition;
      }

      // TODO: We can batch the fetching and updating of tasks to prevent out of memory errors
      const tasksToChange = await TaskModel.getAllTasks({
        ownerId: userId,
        position: {
          [Sequelize.Op.between]: [lowerPosition, higherPosition],
        },
      }, true);

      // Update the task all at once
      const delta = taskOldPosition > taskNewPosition ? 1 : -1;
      await sequelize.transaction(async t => {
        // Update the current task position
        await TaskModel.updateTask(
          { id: taskId }, 
          { position: taskNewPosition }, 
          { transaction: t }
        );
        // Update the other tasks
        await Promise.all(tasksToChange.map(async task => {
          await TaskModel.updateTask(
            { id: task.id }, 
            { position: task.position + delta }, 
            { transaction: t }
          );
        }));
      });

      const updatedTask = await TaskModel.getTask(
        { id: taskId },
      );

      return res.status(200).json({
        status: true,
        data: updatedTask.toJSON(),
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const {
        params: { taskId },
      } = req;

      await TaskModel.deleteTask({ id: taskId });

      return res.status(200).json({
        status: true,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }
  },
};