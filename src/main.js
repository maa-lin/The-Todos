import { Task } from "./models/Task";
import { Todolist } from "./models/Todolist";

//rubrik
const heading = document.createElement("h1");
heading.innerHTML = "My todo lists";
document.getElementById("app").appendChild(heading);

//skapa ny lista knapp
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
const createEditButtons = (listContainer, todoList) => {
  const btnRemoveList = document.createElement("button");
  const btnSort = document.createElement("button");

  btnRemoveList.innerHTML = "Ta bort lista";
  btnSort.innerHTML = "Sortera lista";

  listContainer.appendChild(btnRemoveList);
  listContainer.appendChild(btnSort);

  remove(btnRemoveList, listContainer);
  sort(btnSort, todoList, listContainer);
};

//sortera listan så att färdiga punkter hamnar längst ner i listan
const sort = (btnSort, todoList, listContainer) => {
  btnSort.addEventListener("click", () => {
    let finishedItems = [];

    for (let i = 0; i < todoList.list.length; i++) {
      if (todoList.list[i].isDone === true) {
        finishedItems.push(todoList.list[i]);
        todoList.list.splice(i, 1);
        i--;
      }
    }

    for (let i = 0; i < finishedItems.length; i++) {
      todoList.list.push(finishedItems[i]);
    }

    listContainer.remove();
    createList(todoList);
  });
};

//ta bort hela listan
const remove = (btnRemoveList, listContainer) => {
  btnRemoveList.addEventListener("click", () => {
    document.getElementById("app").removeChild(listContainer);
  });
};

//skapar en lista
const createList = (todoList) => {
  const listContainer = document.createElement("div");
  document.getElementById("app").appendChild(listContainer);

  listContainer.appendChild(todoList.heading);

  const todoListUl = document.createElement("ul");
  listContainer.appendChild(todoListUl);

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

    //Om listan har uppdtaerats, gör .isDone === true överstrukna även i den nya listan
    if (todoList.list[i].isDone === true) {
      todoListItem.className = "li--state-finished";
      todoList.list[i].isDone = true;
    }

    todoListItem.addEventListener("click", () => {
      if (todoList.list[i].isDone === false) {
        todoListItem.className = "li--state-finished";
        todoList.list[i].isDone = true;
      } else {
        todoList.list[i].isDone = false;
        todoListItem.className = "li--state-default";
      }
    });
  }

  createEditButtons(listContainer, todoList);
};

createList(todoList);
