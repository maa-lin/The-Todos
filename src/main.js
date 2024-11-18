import { Todolist } from "./models/Todolist";

const heading = document.createElement("h1");
heading.innerHTML = "My todo lists";
document.getElementById("app").appendChild(heading);

const listHeading = document.createElement("h2");
listHeading.innerHTML = "Att göra idag";

const todoListItems = [
  "Bädda sängen",
  "Äta frukost",
  "Borsta tänderna",
  "Skriva en inköpslista",
  "Gå och handla",
  "Hämta paket",
  "Yoga",
];

const todoList = new Todolist(listHeading, todoListItems);

const createEditButtons = (list) => {
  const btnRemoveList = document.createElement("button");
  const btnSort = document.createElement("button");

  btnRemoveList.innerHTML = "Ta bort lista";
  btnSort.innerHTML = "Sortera lista";

  list.appendChild(btnRemoveList);
  list.appendChild(btnSort);
};

const createList = () => {
  const list = document.createElement("div");
  document.getElementById("app").appendChild(list);

  list.appendChild(todoList.heading);

  const todoListUl = document.createElement("ul");
  todoListUl.style.textAlign = "left";
  list.appendChild(todoListUl);

  for (let i = 0; i < todoList.list.length; i++) {
    const todoListItem = document.createElement("li");
    todoListItem.innerHTML = todoList.list[i];
    todoListItem.style.cursor = "pointer";
    todoListUl.appendChild(todoListItem);

    let isDone = true;

    todoListItem.addEventListener("click", () => {
      if (isDone === true) {
        todoListItem.style.textDecoration = "line-through";
        isDone = false;
      } else {
        todoListItem.style.textDecoration = "none";
        isDone = true;
      }
    });
  }

  createEditButtons(list);
};

createList();
