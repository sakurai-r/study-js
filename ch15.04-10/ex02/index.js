const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    li.classList.toggle("line-through", toggle.checked);
    li.classList.toggle("bg-green-100", toggle.checked);
    li.classList.toggle("text-gray-400", toggle.checked);
  });

  label.textContent = todo;

  destroy.addEventListener("click", () => {
    li.classList.add("opacity-0", "transition-opacity", "duration-500");
    setTimeout(() => li.remove(), 500);
  });

  list.prepend(li);
});
