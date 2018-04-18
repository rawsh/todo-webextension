'use strict';

function idGen() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function addTodo(text) {
    browser.storage.sync.get("todos").then(function(out) {
        var num = out.todos.length;
        out.todos.push({
            checked: false,
            text: text,
            id: idGen()
        });

        browser.storage.sync.set({ "todos" : out.todos }).then(function() {
            renderNthTodo(num, out.todos);
            document.getElementById("new-task").value = "";
        });
    });
}

function removeTodo(elem) {
    document.getElementById(elem.id.substring(2)).remove();
    browser.storage.sync.get("todos").then(function(out) {
        out.todos.splice(elem.dataset.number, 1);
        browser.storage.sync.set({ "todos" : out.todos });
    });
}

function updateData(num, key, val) {
    browser.storage.sync.get("todos").then(function(out) {
        out.todos[num][key] = val;
        browser.storage.sync.set({ "todos" : out.todos });
    });
}

browser.storage.sync.get("todos").then(function(out) {
    if (out.todos === undefined) {
        var todos =
        [
            {
                checked: false,
                text: "first item",
                id: idGen()
            },
            {
                checked: true,
                text: "second item",
                id: idGen()
            },
        ];

        browser.storage.sync.set({ "todos" : todos }).then(function() {
            renderTodos(todos);
        });
    } else {
        renderTodos(out.todos);
    }
});
