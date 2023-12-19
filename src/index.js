import "./style.css";
import "./normalize.css";
import { addNewTodo } from "./todo.js";
import { format } from "date-fns";

const form = document.getElementById("form-popup");
const addTodoButton = document.getElementById("addTodo");
const submit = document.getElementById("form");
const dueDateInput = document.getElementById('dueDate');
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

  addNewTodo(title, description, formattedDate, priorityValue);
  clearFormFields();
  form.close();
});

function clearFormFields() {
  const today = new Date();
  const formattedCurrentDate = format(today, "dd-MM-yyyy");
  document.getElementById("todoTitle").value = "";
  document.getElementById("todoDescription").value = "";
  document.getElementById("dueDate").value = formattedCurrentDate;
}

dueDateInput.addEventListener('input', function() {
  // Parse the selected date
  const selectedDate = new Date(this.value);

  // Get today's date
  const today = new Date();

  // Check if the selected date is in the past
  if (selectedDate < today) {
    // If it is, set the value to today's date
    this.value = format(today, 'yyyy-MM-dd');
  }
});

/////////////////////////////////////////

function toggleFooter() {
  footer.classList.toggle("hidden");
  footer.classList.toggle("show");
}

toggleFooterButton.addEventListener("click", toggleFooter);
