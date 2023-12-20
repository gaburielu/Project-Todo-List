import "./style.css";
import "./normalize.css";
import { addNewTodo, todo } from "./todo.js";
import { format, parseISO } from "date-fns";

const listContainer = document.getElementById("listContainer");
const todoList = [];
const form = document.getElementById("form-popup");
const addTodoButton = document.getElementById("addTodo");
const submit = document.getElementById("form");
const dueDateInput = document.getElementById("dueDate");
const closeForm = document.getElementById("closeForm");
const toggleFooterButton = document.getElementById("footer-toggle");
const footer = document.getElementById("hiddenFooter");

/////////////////////////////////////////

addTodoButton.addEventListener("click", () => {
  form.showModal();
});

closeForm.addEventListener("click", () => {
  form.close();
});

/////////////////////////////////////////

submit.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("todoTitle").value;
  const description = document.getElementById("todoDescription").value;
  const dueDate = document.getElementById("dueDate").value;
  const formattedDate = format(dueDate, "dd-MM-yyyy");
  const priorityElement = document.querySelector(
    'input[name="priority"]:checked'
  );
  const priorityValue = priorityElement ? priorityElement.value : null;

  const newTodo = new todo(title, description, formattedDate, priorityValue);
  todoList.push(newTodo);
  console.table(todoList);
  clearFormFields();
  form.close();
  displayTodoList();
});

function clearFormFields() {
  const today = new Date();
  const formattedCurrentDate = format(today, "dd-MM-yyyy");
  document.getElementById("todoTitle").value = "";
  document.getElementById("todoDescription").value = "";
  document.getElementById("dueDate").value = formattedCurrentDate;
}

dueDateInput.addEventListener("input", function () {
  const selectedDate = new Date(this.value);
  const today = new Date();

  if (selectedDate < today) {
    this.value = format(today, "yyyy-MM-dd");
  }
});

function displayTodoList() {
  listContainer.textContent = "";

  todoList.forEach((todo, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const text = document.createElement("span");
    text.innerHTML = todoList[index].title + todoList[index].todoCheck;

    const changeStatusButton = document.createElement("button");
    changeStatusButton.classList.add("card-button");
    changeStatusButton.classList.add("read-status");
    changeStatusButton.textContent = "Change Status";
    changeStatusButton.addEventListener("click", () => {
      todo.todoCheck = !todo.todoCheck;
      displayTodoList();
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("card-button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      displayTodoList();
    });

    card.appendChild(text);
    card.appendChild(changeStatusButton);
    card.appendChild(removeButton);
    listContainer.appendChild(card);
  });
}

/////////////////////////////////////////

function toggleFooter() {
  footer.classList.toggle("hidden");
  footer.classList.toggle("show");
}

toggleFooterButton.addEventListener("click", toggleFooter);
