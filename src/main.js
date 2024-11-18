import { Task } from "./models/Task";
import { Todolist } from "./models/Todolist";

//rubrik
const heading = document.createElement("h1");
heading.innerHTML = "My todo lists";
document.getElementById("app").appendChild(heading);

//skapa ny lista
const btnNewList = document.createElement("button");
btnNewList.innerHTML = "Skapa ny lista";
document.getElementById("app").appendChild(btnNewList);

//hårdkodad lista
const listHeading = document.createElement("h2");
listHeading.innerHTML = "Att göra idag";

const todoListItem1 = new Task("Bädda sängen", false);
const todoListItem2 = new Task("Äta frukost", false);
const todoListItem3 = new Task("Borsta tänderna", false);
const todoListItem4 = new Task("Skriva en inköpslista", false);
const todoListItem5 = new Task("Gå och handla", false);
const todoListItem6 = new Task("Hämta paket", false);
const todoListItem7 = new Task("Yoga", false);

const todoListItems = [
  todoListItem1,
  todoListItem2,
  todoListItem3,
  todoListItem4,
  todoListItem5,
  todoListItem6,
  todoListItem7,
];

const todoList = new Todolist(listHeading, todoListItems);

//skapar ta-bort-lista knappen och sortera knappen
const createEditButtons = (list) => {
  const btnRemoveList = document.createElement("button");
  const btnSort = document.createElement("button");

  btnRemoveList.innerHTML = "Ta bort lista";
  btnSort.innerHTML = "Sortera lista";

  list.appendChild(btnRemoveList);
  list.appendChild(btnSort);

  remove(btnRemoveList, list);
};

//ta bort hela listan
const remove = (btnRemoveList, list) => {
  btnRemoveList.addEventListener("click", () => {
    document.getElementById("app").removeChild(list);
  });
};

//skapar en lista
const createList = () => {
  const list = document.createElement("div");
  document.getElementById("app").appendChild(list);

  list.appendChild(todoList.heading);

  const todoListUl = document.createElement("ul");
  list.appendChild(todoListUl);

  for (let i = 0; i < todoList.list.length; i++) {
    const todoListItem = document.createElement("li");
    todoListItem.innerHTML = todoListItems[i].task;
    todoListUl.appendChild(todoListItem);

    const btnRemoveListItem = document.createElement("button");
    btnRemoveListItem.innerHTML = "&#10062;";
    todoListItem.appendChild(btnRemoveListItem);

    btnRemoveListItem.addEventListener("click", () => {
      todoListUl.removeChild(todoListItem);
    });

    todoListItem.addEventListener("click", () => {
      if (todoListItems[i].isDone === false) {
        todoListItem.className = "li--state-finished";
        todoListItems[i].isDone = true;
      } else {
        todoListItem.className = "li--state-default";
        todoListItems[i].isDone = false;
      }
    });
  }

  createEditButtons(list);
};

createList();
