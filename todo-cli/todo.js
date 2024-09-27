const todoList = () => {
  var dateToday = new Date();
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  const today = formattedDate(dateToday);

  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const todayStr = today;
    return all.filter((item) => item.dueDate < todayStr);
  };

  const dueToday = () => {
    const todayStr = today;
    return all.filter((item) => item.dueDate === todayStr);
  };

  const dueLater = () => {
    const todayStr = today;
    return all.filter((item) => item.dueDate > todayStr);
  };

  const toDisplayableList = (list) => {
    return list
      .map((item) => {
        const status = item.completed ? "[x]" : "[ ]";
        const date =
          item.dueDate === formattedDate(new Date()) ? "" : ` ${item.dueDate}`;
        return status + " " + item.title + " " + date;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
