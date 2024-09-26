const { todoList, formattedDate } = require("../todo.js"); // Adjust the path as needed

describe("Todo List Tests", () => {
  let todos; // Variable to hold the todo list instance

  // Initialize a new todo list before each test
  beforeEach(() => {
    todos = todoList(); // Create a new todo list instance
  });

  test("Should add a todo item", () => {
    todos.add({
      title: "Pay electric bill",
      dueDate: formattedDate(new Date()),
      completed: false,
    });
    expect(todos.all[0].title).toBe("Pay electric bill");
  });

  // Add more tests here
});
