const { todoList, formattedDate } = require("../todo.js"); // Adjust the path as needed

// eslint-disable-next-line no-undef
describe("Todo List Tests", () => {
  let todos; // Variable to hold the todo list instance

  // Initialize a new todo list before each test
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    todos = todoList(); // Create a new todo list instance
  });

  // eslint-disable-next-line no-undef
  test("Should add a todo item", () => {
    todos.add({
      title: "Pay electric bill",
      dueDate: formattedDate(new Date()),
      completed: false,
    });
    // eslint-disable-next-line no-undef
    expect(todos.all[0].title).toBe("Pay electric bill");
  });

  // Add more tests here
});
