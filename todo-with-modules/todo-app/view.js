function createAppTitle(title) {
  let appTitle = document.createElement('h2')
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  }
}

function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const doneClass = 'list-group-item-success';
  let item = document.createElement('li');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
  item.textContent = todoItem.name;
  if (todoItem.done) {
    item.classList.add(doneClass);
  }

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  doneButton.addEventListener('click', function () {
    onDone({ todoItem });
    item.classList.toggle(doneClass, todoItem.done);
  });
  deleteButton.addEventListener('click', function () {
    onDelete({ todoItem, element: item });
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick
}, listState) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let btnStorage = document.createElement('button');
  let todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  btnStorage.classList.add('btn', 'btn-secondary', 'js-switch-storage-btn');
  btnStorage.textContent = listState === 'local' ? 'Перейти на серверное хранилище' : 'Перейти на локальное хранилище';

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(btnStorage);
  container.append(todoList);

  btnStorage.addEventListener('click', () => {
    if (listState === 'local') {
      listState = 'server';
      localStorage.setItem('listState', 'server')
      window.location.reload();
    } else if (listState === 'server') {
      listState = 'local';
      localStorage.setItem('listState', 'local')
      window.location.reload();
    };
    btnStorage.textContent = listState === 'local' ? 'Перейти на серверное хранилище' : 'Перейти на локальное хранилище';
  })

  todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  })

  todoItemForm.form.addEventListener('submit', e => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    new Promise(async (resolve) => {
      const todoItem = listState === 'server'
        ? await onCreateFormSubmit({ owner, name: todoItemForm.input.value.trim() })
        : onCreateFormSubmit(todoItemList, owner, { name: todoItemForm.input.value.trim() });
      resolve(todoItem);
    })
      .then((item) => {
        const todoItemElement = createTodoItemElement(item, handlers);
        todoList.append(todoItemElement);
        todoItemForm.input.value = '';
      })
  });
}

export { createTodoApp }
