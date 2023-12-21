import { format, addDays, differenceInDays } from 'date-fns';

const today = new Date();

const formattedCurrentDate = format(today, 'dd-MM-yyyy');
console.log(formattedCurrentDate);

export class todo{
    constructor(title, description, dueDate, priority){
        this.title = title,
        this.description = description,
        this.dateCreated = formattedCurrentDate,
        this.dueDate = dueDate,
        this.priority = priority,
        this.todoCheck = false
    }
}

export function addNewTodo(title, description, dueDate, priority){
    const newTodo = new todo(title, description, dueDate, priority);
    console.log(newTodo);
}

// let newdo = new todo("exercise", "as per descrip", format(addDays(today, 5), 'dd-MM-yyyy'));

// console.table(newdo);