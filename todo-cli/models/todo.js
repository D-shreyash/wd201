"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static async createTask(details) {
      return await Task.create(details);
    }

    static async displayList() {
      console.log("Task List\n");

      console.log("Overdue");
      const expiredTasks = await Task.getOverdue();
      if (expiredTasks.length === 0) {
        console.log("No overdue tasks.");
      } else {
        console.log(
          expiredTasks.map((item) => item.getFormattedString()).join("\n")
        );
      }
      console.log("\n");

      console.log("Due Today");
      const todayTasks = await Task.getToday();
      if (todayTasks.length === 0) {
        console.log("No tasks due today.");
      } else {
        console.log(
          todayTasks.map((item) => item.getFormattedString()).join("\n")
        );
      }
      console.log("\n");

      console.log("Due Later");
      const upcomingTasks = await Task.getLater();
      if (upcomingTasks.length === 0) {
        console.log("No tasks due later.");
      } else {
        console.log(
          upcomingTasks.map((item) => item.getFormattedString()).join("\n")
        );
      }
    }

    static async getOverdue() {
      const currentDate = new Date();
      return await Task.findAll({
        where: {
          dueDate: {
            [Op.lt]: currentDate,
          },
        },
      });
    }

    static async getToday() {
      const currentDate = new Date();
      const startOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const endOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
      return await Task.findAll({
        where: {
          dueDate: {
            [Op.gte]: startOfDay,
            [Op.lt]: endOfDay,
          },
        },
      });
    }

    static async getLater() {
      const currentDate = new Date();
      return await Task.findAll({
        where: {
          dueDate: {
            [Op.gt]: currentDate,
          },
        },
      });
    }

    static async markComplete(taskId) {
      const taskItem = await Task.findByPk(taskId);
      if (taskItem) {
        taskItem.completed = true;
        await taskItem.save();
        console.log(`Task ${taskId} marked as complete.`);
      } else {
        throw new Error("Task not found");
      }
    }

    getFormattedString() {
      const currentDate = new Date();
      const taskDueDate = new Date(this.dueDate);
      const isToday =
        taskDueDate.toISOString().slice(0, 10) ===
        currentDate.toISOString().slice(0, 10);
      const status = this.completed ? "[x]" : "[ ]";

      if (this.completed) {
        if (isToday) {
          return `${this.id}. ${status} ${this.title}`;
        } else {
          return `${this.id}. ${status} ${this.title} ${taskDueDate
            .toISOString()
            .slice(0, 10)}`;
        }
      } else {
        if (isToday) {
          return `${this.id}. ${status} ${this.title}`;
        } else {
          return `${this.id}. ${status} ${this.title} ${taskDueDate
            .toISOString()
            .slice(0, 10)}`;
        }
      }
    }
  }

  Task.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );

  return Task;
};
