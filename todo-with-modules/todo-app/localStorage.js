export function getTodoListFromLocalStorage(keyName) {
  return localStorage.getItem(keyName) ? JSON.parse(localStorage.getItem(keyName)) : [];
}

function saveChanges(todoItemsArray, keyName) {
  localStorage.setItem(keyName, JSON.stringify(todoItemsArray));
}

export function createTodoItemLocal(todoItemsArray, keyName, { name }) {
  let todoItem = { name: name, done: false, owner: keyName };
  todoItemsArray.push(todoItem);
  saveChanges(todoItemsArray, keyName);
  return todoItem
}

export function switchTodoItemDoneLocal({ todoItem }) {
  let todoItemsArray = JSON.parse(localStorage.getItem(todoItem.owner));
  for (let i = 0; i < todoItemsArray.length; i++) {
    if (todoItemsArray[i].name === todoItem.name && todoItemsArray[i].done === todoItem.done) {
      todoItemsArray[i].done = !todoItemsArray[i].done;
      todoItem.done = !todoItem.done;
    }
  }
  saveChanges(todoItemsArray, todoItem.owner)
}

export function deleteTodoItemLocal({ todoItem, element }) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  element.remove();

  const todoItemsArray = JSON.parse(localStorage.getItem(todoItem.owner));
  const todoItemsNewArray = todoItemsArray.filter((item) => item.name !== todoItem.name)
  saveChanges(todoItemsNewArray, todoItem.owner)
}
