const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const DB_NAME = "todoApp";
const DB_VERSION = 1;
const STORE_NAME = "todos";

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
    request.onsuccess = (e) => {
      resolve(e.target.result);
    };
    request.onerror = (e) => reject(e.target.error);
  });
}

function useDB(callback) {
  return initDB().then((db) => {
    return callback(db).finally(() => db.close());
  });
}

function getTodos() {
  return useDB((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

function addTodoToDB(todo) {
  return useDB((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(todo);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

function deleteTodoFromDB(id) {
  return useDB((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

function updateTodoInDB(todo) {
  return useDB((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(todo);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  });
}

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo) => {
    addTodoElement(todo);
  });
}

function addTodoElement(todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.completed;
  toggle.onchange = async (e) => {
    label.style.textDecorationLine = e.target.checked ? "line-through" : "none";
    todo.completed = e.target.checked;
    await updateTodoInDB(todo);
    syncChanges();
  };

  const destroy = document.createElement("button");
  destroy.innerText = "❌";
  destroy.onclick = async () => {
    await deleteTodoFromDB(todo.id);
    elem.remove();
    syncChanges();
  };

  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText === "") {
    return;
  }
  input.value = "";
  const newTodo = { text: todoText, completed: false };
  await addTodoToDB(newTodo);
  renderTodos(await getTodos());
  syncChanges();
});

const channel = new BroadcastChannel("todoApp");
channel.onmessage = async () => {
  renderTodos(await getTodos());
};

function syncChanges() {
  channel.postMessage("update");
}

document.addEventListener("DOMContentLoaded", async () => {
  renderTodos(await getTodos());
});
