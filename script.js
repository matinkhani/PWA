const todos = [];

function add() {
  const task = document.getElementById("task").value;
  todos.push(task);
  render();
}

function render() {
  const list = document.getElementById("todos");
  document.getElementById("task").value = "";
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;
    list.appendChild(li);
  });
}
