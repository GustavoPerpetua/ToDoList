const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const buttonE = document.getElementById("enter");
const check = "fa fa-check";
const uncheck = "fa fa-circle ";
const lineThrough = "line-through";

let id = 0;

const saveToLocalStorage = () => {
  const tasks = [];
  document.querySelectorAll(".task").forEach((taskElement) => {
    let textElement = taskElement.querySelector(".text");
    let isCompleted = textElement.classList.contains(lineThrough);
    tasks.push({
      text: textElement.innerText,
      completed: isCompleted,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addingTask(task.text, id, task.completed, false);
  });
};

const addingTask = (task, id, done, del) => {
  if (del) {
    return;
  }
  const DONE = done ? check : uncheck;
  const LINE = done ? lineThrough : "";

  const element = `
      <li class="task" id="element-${id}">
        <i class="${DONE}" data="done" id="${id}"></i>
        <p class="text ${LINE}">${task}</p>
        <i class="far fa-trash-alt" data="delete" id="${id}"></i>
      </li>
    `;
  list.insertAdjacentHTML("beforeend", element);
  id++;
};

buttonE.addEventListener("click", () => {
  const task = input.value;
  if (task) {
    addingTask(task, id, false, false);
  }
  input.value = "";
  saveToLocalStorage();
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    const task = input.value;
    if (task) {
      addingTask(task, id, false, false);
    }
    input.value = "";
    saveToLocalStorage();
  }
});

const taskDone = (element) => {
  const item = element.parentNode;
  const textElement = item.querySelector(".text");
  textElement.classList.toggle(lineThrough);

  if (element.classList.contains("fa-check")) {
    element.classList.remove("fa-check");
    element.classList.add("fa-circle");
  } else {
    element.classList.remove("fa-circle");
    element.classList.add("fa-check");
  }

  saveToLocalStorage();
};

const taskDelete = (element) => {
  const item = element.parentNode;
  item.remove();
  saveToLocalStorage();
};

list.addEventListener("click", (e) => {
  const element = e.target;
  if (element.attributes.data) {
    const elementData = element.attributes.data.value;
    if (elementData === "done") {
      taskDone(element);
    } else if (elementData === "delete") {
      taskDelete(element);
    }
  }
});

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
