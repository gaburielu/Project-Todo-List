import { format, addDays, differenceInDays } from 'date-fns';
import { todoList, projectList, currentPage } from "./index.js";

const listContainer = document.getElementById("listContainer");

export function displayTodoList(list) {
    listContainer.textContent = "";
  
    list.forEach((todo, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      const text = document.createElement("div");
      text.classList.add('tooltip-container');
      text.innerHTML = list[index].createTitleSpan();

      const dueDateSpan = document.createElement("span");
      dueDateSpan.innerHTML = list[index].createDueDateSpan();

      const priorityIcon = document.createElement("span");
      priorityIcon.innerHTML = list[index].createPriorityIcon();

      const comment = document.createElement("span");
      comment.innerHTML = list[index].createDescriptionComment();
      text.appendChild(comment);
  
      const checkboxButton = createCheckboxButton(todo);
      const removeButton = createRemoveButton(index);
  
      card.appendChild(removeButton);
      card.appendChild(text);
      card.appendChild(dueDateSpan);
      card.appendChild(priorityIcon);
      card.appendChild(checkboxButton);
      listContainer.appendChild(card);
    });
  }
  
  function createCheckboxButton(todo){
    const checkboxButton = document.createElement("button");
    checkboxButton.classList.add("card-button");
    checkboxButton.classList.add("read-status");
    checkboxButton.addEventListener("click", () => {
      todo.todoCheck = !todo.todoCheck;
      updateCheckbox(checkboxButton, todo);
      render(todoList, projectList, currentPage);
    });
    updateCheckbox(checkboxButton, todo);
    return checkboxButton;
  }
  
  function createRemoveButton(index){
    const removeButton = document.createElement("button");
    removeButton.classList.add("card-button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = '✘';
    removeButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      render(todoList, projectList, currentPage);
    });
    return removeButton;
  }
  
  function updateCheckbox(checkboxButton, todo) {
    if (todo.todoCheck === false) {
      checkboxButton.textContent = "☐";
    } else {
      checkboxButton.textContent = "☑";
    }
  }

  export function render(todoList, projectList, currentPage){
    let newArray = [];

    todoList.forEach((todo, index) => {
    if(todoList[index].project == currentPage){
      newArray.push(todo)
    }
    });

    if (projectList.includes(currentPage)) {
      displayTodoList(newArray);
    } else {
      displayTodoList(todoList);
    }
  }