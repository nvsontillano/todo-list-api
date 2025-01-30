const { DataTypes } = require("sequelize");

const TaskModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1023),
    allowNull: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("task", TaskModel, {
      paranoid: true,
      timestamps: true,
    })
  },

  getTaskById: (id) => {
    return this.model.findByPk(id);
  },

  getAllTasks: (filter) => {
    return this.model.findAll({
      where: filter,
      paranoid: false,
    });
  },

  getTask: (filter, order) => {
    const query = {
      where: filter,
      paranoid: false,
    };
  
    if (order) {
      query.order = order;
    }
  
    return this.model.findOne(query);
  },

  createTask: (user) => {
    return this.model.create(user);
  },

  updateTask: (filter, updatedValue) => {
    return this.model.update(updatedValue, {
      where: filter,
    });
  },

  deleteTask: (filter) => {
    return this.model.destroy({
      where: filter
    });
  },

  
}