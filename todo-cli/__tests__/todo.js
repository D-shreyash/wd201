/* eslint-disable no-undef */
const todoList = require("../todo");

let { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo List Tests", () => {
  beforeAll(() => {
    add({
      title: "task 1",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    add({
      title: "task 2 overdue",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0],
    });
    add({
      title: "task 1 tomarrow",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    });
  });

  test("should add", () => {
    let len = all.length;

    add({
      title: "Adding task test 1",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });

    expect(all.length).toBe(len + 1);
  });

  test("should mark as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("should test overdue", () => {
    let overdueItem = overdue();
    expect(overdueItem.length).toBe(1);
    expect(overdueItem[0].title).toBe("task 2 overdue");
  });

  test("should give due today", () => {
    let dueTodayItem = dueToday();
    expect(dueTodayItem.length).toBe(2);
    expect(dueTodayItem[0].title).toBe("task 1");
  });

  test("should give due later", () => {
    let dueLaterItem = dueLater();
    expect(dueLaterItem.length).toBe(1);
    expect(dueLaterItem[0].title).toBe("task 1 tomarrow");
  });
});

const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});
