const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

console.log(document.cookie);

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
    }

    data.items.forEach((item) => appendToDoItem(item));
  } catch (error) {
    alert(error);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  /**
   * event.preventDefaultメソッドは、submitイベントの発生元であるフォームが持つ
   * デフォルトの動作をキャンセルするメソッドです。
   * フォームが持つデフォルトの動作とは、フォームの内容を指定したURLへ送信するという動作です。
   * ここでは form 要素に送信先が指定されていないため、現在のURLに対してフォームの内容を送信します。
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

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
    }

    appendToDoItem(data);
  } catch (error) {
    alert(error);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    try {
      const newStatus = toggle.checked ? "completed" : "active";
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      label.style.textDecorationLine =
        newStatus === "completed" ? "line-through" : "none";
    } catch (error) {
      alert(error);
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
      }
      elem.remove();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
