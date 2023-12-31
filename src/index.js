import "./style.css";
import "./normalize.css";
import { todo } from "./todo.js";
import { format } from "date-fns";
import { render } from "./render.js";

export let todoList = [];
export let projectList = [];
export let currentPage = "all";
const todoForm = document.getElementById("todo-form-popup");
const allTaskButton = document.getElementById("allTask");
const projectForm = document.getElementById("project-form-popup");
const addProjectButton = document.getElementById("addGoal");
const addTodoButton = document.getElementById("addTodo");
const submit = document.getElementById("form");
const submitProject = document.getElementById("ProjectForm");
const dueDateInput = document.getElementById("dueDate");
const projectSelect = document.getElementById("project");
const sidebarProjectList = document.getElementById("sidebar-project");
const closeForm = document.getElementById("closeForm");
const closeProjectForm = document.getElementById("closeProjectForm");
const toggleFooterButton = document.getElementById("footer-toggle");
const footer = document.getElementById("hiddenFooter");

////////// EVENT LISTENER //////////

initializeData();

addTodoButton.addEventListener("click", () => {
  todoForm.showModal();
});

closeForm.addEventListener("click", function (e) {
  e.preventDefault();
  todoForm.close();
});

submit.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("todoTitle").value;
  const description = document.getElementById("todoDescription").value;
  const dueDate = document.getElementById("dueDate").value;
  const priorityElement = document.querySelector(
    'input[name="priority"]:checked'
  );
  const priorityValue = priorityElement ? priorityElement.value : null;
  const projectName = document.getElementById("project").value;

  const newTodo = new todo(
    title,
    description,
    dueDate,
    priorityValue,
    projectName
  );
  todoList.push(newTodo);
  saveDataToLocalStorage();
  clearFormFields();
  todoForm.close();
  render(todoList, projectList, currentPage);
});

addProjectButton.addEventListener("click", () => {
  projectForm.showModal();
});

closeProjectForm.addEventListener("click", function (e) {
  e.preventDefault();
  clearFormFields();
  projectForm.close();
});

submitProject.addEventListener("submit", function (e) {
  e.preventDefault();
  const projectTitle = document.getElementById("newProject").value;
  addNewProject(projectTitle);
  projectForm.close();
});

allTaskButton.addEventListener("click", () => handleProjectClick("all"));

function addNewProject(projectTitle) {
  if (projectList.length >= 5) {
    alert("You have reached the maximum limit of 5 projects.");
    document.getElementById("newProject").value = "";
    clearFormFields();
    return;
  }

  if (projectList.includes(projectTitle)) {
    alert("Project with the same title already exists.");
    document.getElementById("newProject").value = "";
    clearFormFields();
    return;
  }
  projectList.push(projectTitle);
  document.getElementById("newProject").value = "";
  populateProjects();
}

function removeProject(index) {
  const projectToDelete = projectList[index];

  const confirmation = window.confirm(
    `Are you sure you want to remove the project "${projectToDelete}" and all associated todos?`
  );

  if (confirmation) {
    projectList.splice(index, 1);

    const updatedTodoList = todoList.filter(
      (todo) => todo.project !== projectToDelete
    );
    todoList.length = 0;
    Array.prototype.push.apply(todoList, updatedTodoList);

    populateProjects();
    render(todoList, projectList, currentPage);
  }
}

function handleProjectClick(projectTitle) {
  currentPage = projectTitle;
  render(todoList, projectList, currentPage);
}

function populateProjects() {
  projectSelect.innerHTML = "";
  sidebarProjectList.innerHTML = "";

  projectList.forEach((project, index) => {
    const option = document.createElement("option");
    option.value = project;
    option.text = project;
    projectSelect.appendChild(option);

    const projectDisplay = document.createElement("div");
    projectDisplay.classList.add("project-display");

    const projectButton = document.createElement("button");
    projectButton.classList.add("text-hover", "renderbutton");
    projectButton.textContent = project;

    projectButton.addEventListener("click", () => handleProjectClick(project));

    const removeButton = document.createElement("button");
    removeButton.classList.add("card-button", "remove-button");
    removeButton.textContent = "✘";
    removeButton.addEventListener("click", () => removeProject(index));

    projectDisplay.appendChild(projectButton);
    projectDisplay.appendChild(removeButton);

    sidebarProjectList.appendChild(projectDisplay);
    render(todoList, projectList, currentPage);
    saveDataToLocalStorage();
  });
}

function clearFormFields() {
  const today = new Date();
  const formattedCurrentDate = format(today, "dd-MM-yyyy");
  document.getElementById("todoTitle").value = "";
  document.getElementById("todoDescription").value = "";
  document.getElementById("dueDate").value = formattedCurrentDate;
}

dueDateInput.addEventListener("input", function () {
  //To default past dates as todays date
  const selectedDate = new Date(this.value);
  const today = new Date();

  if (selectedDate < today) {
    this.value = format(today, "yyyy-MM-dd");
  }
});

/////////////////////////////////////////

function toggleFooter() {
  footer.classList.toggle("hidden");
  footer.classList.toggle("show");
}

toggleFooterButton.addEventListener("click", toggleFooter);

/////////////////////////////////////////

if (!projectList.includes("Misc")) {
  addNewProject("Misc");
}

export function saveDataToLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("projectList", JSON.stringify(projectList));
}

function getDataFromLocalStorage() {
  let storedTodoList = localStorage.getItem("todoList");
  let storedProjectList = localStorage.getItem("projectList");

  return {
    todoList: storedTodoList ? JSON.parse(storedTodoList) : [],
    projectList: storedProjectList ? JSON.parse(storedProjectList) : [],
  };
}

export function initializeData() {
  const { todoList: storedTodoList, projectList: storedProjectList } =
    getDataFromLocalStorage();

  todoList = storedTodoList.map(
    (todoData) =>
      new todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.project
      )
  );
  projectList = storedProjectList;
  currentPage = "all";
  populateProjects();
}
