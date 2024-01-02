import { format } from "date-fns";

const today = new Date();

const formattedCurrentDate = format(today, "dd-MM-yyyy");

export class todo {
  constructor(title, description, dueDate, priority, project) {
    (this.title = title),
      (this.description = description),
      (this.dateCreated = new Date()),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.todoCheck = false),
      (this.project = project);
  }

  createTitleSpan() {
    return `      ${
      this.todoCheck
        ? `<span style="color: #395d73"> ${this.title} </span>`
        : `<span style="color: #6ba7bf"> ${this.title} </span>`
    }`;
  }

  createDueDateSpan() {
    return `      ${
      this.todoCheck
        ? `<span style="color: #395d73; font-size: var(--space-3xs-2xs);"> ${formatDate(
            this.dueDate
          )} </span>`
        : `<span style="color: #6ba7bf; font-size: var(--space-3xs-2xs);"> ${formatDate(
            this.dueDate
          )} </span>`
    }`;
  }

  createDescriptionComment() {
    return `      ${
      this.todoCheck
        ? `<span class="tooltip" style="color: #395d73"> ${this.description} </span>`
        : `<span class="tooltip" style="color: #6ba7bf"> ${this.description} </span>`
    }`;
  }
  createPriorityIcon() {
    if (this.priority === "high") {
      return `<span style="color: red; font-size: var(--space-s-m);text-align: center;"> ✔ </span>`;
    } else if (this.priority === "medium") {
      return `<span style="color: orange; font-size: var(--space-s-m);text-align: center;"> ✔ </span>`;
    } else {
      return `<span style="color: yellow; font-size: var(--space-s-m);text-align: center;"> ✓ </span>`;
    }
  }
}

function formatDate(date) {
  return format(date, "dd/MM/yy");
}
