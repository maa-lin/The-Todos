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

const createList = (listHeading, todoListItems) => {
  const list = document.createElement("div");
  document.getElementById("app").appendChild(list);

  list.appendChild(listHeading);

  const todoList = document.createElement("ul");
  todoList.style.textAlign = "left";
  list.appendChild(todoList);

  for (let i = 0; i < todoListItems.length; i++) {
    const todoListItem = document.createElement("li");
    todoListItem.innerHTML = todoListItems[i];
    todoListItem.style.cursor = "pointer";
    todoList.appendChild(todoListItem);

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
};

createList(listHeading, todoListItems);
