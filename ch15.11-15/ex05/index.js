const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const STORAGE_KEY = "todo-list";

const localTodoList = [];

// `localStorage`が使用可能かどうかを判定
function isLocalStorageAvailable() {
  try {
    localStorage.setItem("__test__", "__test__");
    localStorage.removeItem("__test__");
    return true;
  } catch (e) {
    return false;
  }
}

const storageAvailable = isLocalStorageAvailable();

function saveTodos(todos) {
  if (storageAvailable) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } else {
    localTodoList.splice(0, localTodoList.length, ...todos);
  }
}

function loadTodos() {
  if (storageAvailable) {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } else {
    return localTodoList;
  }
}

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo) => {
    addTodoElement(todo.text, todo.completed);
  });
}

function addTodoElement(todoText, completed = false) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todoText;
  label.style.textDecorationLine = completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = completed;
  toggle.onchange = (e) => {
    label.style.textDecorationLine = e.target.checked ? "line-through" : "none";
    const todos = loadTodos();
    const index = todos.findIndex((t) => t.text === todoText);
    if (index !== -1) {
      todos[index].completed = e.target.checked;
      saveTodos(todos);
    }
  };

  const destroy = document.createElement("button");
  destroy.innerText = "❌";
  destroy.onclick = () => {
    const todos = loadTodos().filter((t) => t.text !== todoText);
    saveTodos(todos);
    elem.remove();
  };

  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

form.addEventListener("submit", (e) => {
  /**
   * event.preventDefaultメソッドは、submitイベントの発生元であるフォームが持つ
   * デフォルトの動作をキャンセルするメソッドです。
   * フォームが持つデフォルトの動作とは、フォームの内容を指定したURLへ送信するという動作です。
   * ここではform要素に送信先が指定されていないため、現在のURLに対してフォームの内容を送信します。
   * しかしこの動作は邪魔になるため、event.preventDefaultメソッドを呼び出すことで、
   * このデフォルトの動作をキャンセルしています。
   * https://jsprimer.net/use-case/todoapp/form-event/#form-event
   */
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // ToDoをリストに追加
  const todos = loadTodos();
  todos.push({ text: todo, completed: false });
  saveTodos(todos);
  addTodoElement(todo);
});

// 複数のタブで ToDo 管理アプリケーションを開いている状態で、あるタブでの変更が他のタブにも自動的に反映されるようにしなさい。 (例：タブ A とタブ B を開いている状態で、タブ A で ToDo を追加し、タブ B に切り替えると タブ A で追加した ToDo が表示される)
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY) {
    const todos = loadTodos();
    renderTodos(todos);
  }
});

// 一度閉じて再度開いても、画面更新しても、ToDo の内容が維持される
document.addEventListener("DOMContentLoaded", () => {
  const todos = loadTodos();
  renderTodos(todos);
});
