import { Task } from "./models/Task";
import { Todolist } from "./models/Todolist";

//rubrik
const heading = document.createElement("h1");
heading.innerHTML = "My todo lists";
document.getElementById("app").appendChild(heading);

//Skapa en helt ny lista
const newListContainer = document.createElement("section");
newListContainer.className = "new-list-container";
document.getElementById("app").appendChild(newListContainer);

const inputNewTodoList = document.createElement("input");
inputNewTodoList.placeholder = "New todo-list...";
newListContainer.appendChild(inputNewTodoList);

const btnNewTodoList = document.createElement("button");
btnNewTodoList.innerHTML = "Create";
btnNewTodoList.disabled = true;
newListContainer.appendChild(btnNewTodoList);

inputNewTodoList.addEventListener("input", () => {
  btnNewTodoList.disabled = false;
});

btnNewTodoList.addEventListener("click", () => {
  const listTitle = inputNewTodoList.value;
  const newTasks = [];
  const newList = new Todolist(listTitle, newTasks);

  createList(newList);

  inputNewTodoList.value = "";
  btnNewTodoList.disabled = true;
  saveTodoList(newList);
});

//Container för alla listor
const container = document.createElement("section");
container.className = "container";
document.getElementById("app").appendChild(container);

//hårdkodad lista
const listHeading = "Julmat att laga";

const todoListItem1 = new Task("Julskinka", false);
const todoListItem2 = new Task("Grynkaka", false);
const todoListItem3 = new Task("Nubbesallad", false);
const todoListItem4 = new Task("Gravad lax", false);
const todoListItem5 = new Task("Rörost", false);
const todoListItem6 = new Task("Köttbullar", false);
const todoListItem7 = new Task("Tjälknöl", false);

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

//Visa senaste listorna
window.onload = () => {
  const todoLists = JSON.parse(localStorage.getItem("todoLists"));

  for (let i = 0; i < todoLists.length; i++) {
    createList(todoLists[i]);
  }
};

//Spara till localStorage
const saveTodoList = (todoList) => {
  let todoLists = JSON.parse(localStorage.getItem("todoLists")) || [];

  if (todoLists.length === 0) {
    todoLists.push(todoList);
  }

  let foundList = false;

  for (let i = 0; i < todoLists.length; i++) {
    if (todoLists[i].heading === todoList.heading) {
      todoLists[i] = todoList;
      foundList = true;
    }
  }

  if (foundList === false) {
    todoLists.push(todoList);
  }

  localStorage.setItem("todoLists", JSON.stringify(todoLists));
};

//skapar knappen som tar bort enskilda punkter och sortera knappen
const createEditButtons = (listContainer, container, todoList) => {
  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";
  listContainer.appendChild(btnContainer);

  const btnRemoveList = document.createElement("button");
  const btnSort = document.createElement("button");

  btnRemoveList.innerHTML = "Remove";
  btnSort.innerHTML = "Sort";

  btnContainer.appendChild(btnRemoveList);
  btnContainer.appendChild(btnSort);

  remove(btnRemoveList, container, listContainer);
  sort(btnSort, todoList, listContainer);
};

//sortera listan så att färdiga punkter hamnar längst ner i listan
const sort = (btn, todoList, listContainer) => {
  btn.addEventListener("click", () => {
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
    saveTodoList(todoList);
  });
};

//ta bort hela listan
const remove = (btnRemoveList, container, listContainer) => {
  btnRemoveList.addEventListener("click", () => {
    container.removeChild(listContainer);
  });
};

//lägg till en ny todo
const addNewTodo = (listContainer, todoList) => {
  const newTodoContainer = document.createElement("div");
  newTodoContainer.className = "new-todo-container";
  listContainer.appendChild(newTodoContainer);

  const inputNewTodo = document.createElement("input");
  inputNewTodo.placeholder = "New todo...";
  newTodoContainer.appendChild(inputNewTodo);

  const btnAddTodo = document.createElement("button");
  btnAddTodo.innerHTML = "Add";
  newTodoContainer.appendChild(btnAddTodo);

  btnAddTodo.addEventListener("click", () => {
    const newTask = new Task(inputNewTodo.value, false);
    todoList.list.unshift(newTask);

    listContainer.remove();
    createList(todoList);
    saveTodoList(todoList);
  });
};

//skapar en lista och lägger den i en egen container
const createList = (todoList) => {
  const listContainer = document.createElement("div");
  listContainer.className = "list-container";
  container.appendChild(listContainer);

  const listTitle = document.createElement("h2");
  listTitle.innerHTML = todoList.heading;

  listContainer.appendChild(listTitle);

  //anropar funktionen som lägger till ny todo
  addNewTodo(listContainer, todoList);

  const todoListOl = document.createElement("ol");
  listContainer.appendChild(todoListOl);

  for (let i = 0; i < todoList.list.length; i++) {
    const todoListItem = document.createElement("li");
    const todoListItemText = document.createElement("span");
    todoListItemText.innerHTML = todoList.list[i].task;
    todoListItem.appendChild(todoListItemText);

    todoListOl.appendChild(todoListItem);

    //skapar en tabortknapp vid varje punkt i listan
    const btnRemoveListItem = document.createElement("button");
    btnRemoveListItem.innerHTML = "&#x274C;";
    todoListItem.appendChild(btnRemoveListItem);

    btnRemoveListItem.addEventListener("click", () => {
      todoList.list.splice(i, 1);

      listContainer.remove();
      createList(todoList);
      saveTodoList(todoList);
    });

    //Om listan har uppdaterats, gör .isDone === true överstrukna även i den nya listan
    if (todoList.list[i].isDone === true) {
      todoListItemText.className = "li--state-finished";
    }

    todoListItemText.addEventListener("click", () => {
      if (todoList.list[i].isDone === false) {
        todoList.list[i].isDone = true;
      } else {
        todoList.list[i].isDone = false;
      }
      listContainer.remove();
      createList(todoList);
      saveTodoList(todoList);
    });
  }

  createEditButtons(listContainer, container, todoList);
};
