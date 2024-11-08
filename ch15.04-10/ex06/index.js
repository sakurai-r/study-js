const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.todoList = this.shadowRoot.querySelector("#todo-list");

    this.form.addEventListener("submit", (e) => this.addTodo(e));
  }

  addTodo = (event) => {
    event.preventDefault();
    if (!this.input.value.trim()) {
      return;
    }

    const list = document.createElement("li");
    // 以下のコードは XSS ができてしまうのでNG
    list.innerHTML = `<input type="checkbox"><span>${this.input.value.trim()}</span><button>❌</button>`;
    list
      .querySelector("input")
      .addEventListener("change", () => list.classList.toggle("completed"));
    list.querySelector("button").addEventListener("click", () => list.remove());

    this.todoList.append(list);
    this.input.value = "";
  }
}

customElements.define("todo-app", TodoApp);
