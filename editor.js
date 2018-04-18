'use strict';

function renderNthTodo(i, todos) {
    var todolist = document.getElementById("task-list");
    var t = todos[i];

    var div = document.createElement("div");
    var check = document.createElement("input");
    var span = document.createElement("span");
    var text = document.createTextNode(t.text);

    check.type = "checkbox";
    check.checked = t.checked;
    check.id = "c-" + t.id
    span.id = "s-" + t.id
    div.id = t.id

    div.dataset.number = i;
    span.dataset.number = i;
    check.dataset.number = i;

    check.classList.add("checkbox");
    div.classList.add("task-container");
    span.classList.add("task-span");

    span.onclick = editText;
    check.onclick = editCheck;

    span.oncontextmenu = function() {
      removeTodo(this);
      return false;
    };

    span.appendChild(text);
    div.appendChild(check);
    div.appendChild(span);

    todolist.appendChild(div);
}

function editText() {
    text = this.innerHTML;
    this.setAttribute("contenteditable", true);
    this.focus();

    this.oncontextmenu = "";

    this.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            text = this.innerHTML;
            num = parseInt(this.dataset.number);
            updateData(num, "text", text);
            this.setAttribute("contenteditable", false);
            this.oncontextmenu = function() {
              removeTodo(this);
              return false;
            };
        }

        return key != 13;
    });
}

function editCheck() {
    var checked = this.checked;
    var num = parseInt(this.dataset.number);
    updateData(num, "checked", checked);
}

function renderTodos(todos) {
    for (var i = 0; i < todos.length; i++) {
        renderNthTodo(i, todos);
    }

    document.getElementById("new-task").addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            var text = this.value;
            addTodo(text);
        }
        return key != 13;
    });
}
