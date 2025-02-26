document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task.text, task.done));
}

function renderTask(taskText, done = false) {
    let d = new Date();
    let li = document.createElement("li");
    let span = document.createElement("span");
    let date = document.createElement("span");
    date.innerText =d.toUTCString();
    span.innerText = taskText;
    span.contentEditable = true;
    span.addEventListener("input", saveTasks);
    
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.onclick = () => doneTask(li);
    
    let undoneBtn = document.createElement("button");
    undoneBtn.innerText = "Undone";
    undoneBtn.onclick = () => unDone(li);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteTask(li);
    
    li.append(date, span, doneBtn, undoneBtn, deleteBtn);
    document.getElementById("taskList").prepend(li);
}

function saveTasks() {
    let tasks = [...document.querySelectorAll("li")].map(li => ({
        text: li.querySelector("span").innerText,
        done: li.classList.contains("done")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(li) {
    li.remove();
    saveTasks();
}

function createTask() {
    let input = document.getElementById("taskName");
    if (input.value.trim()) {
        renderTask(input.value);
        saveTasks();
        input.value = "";
    }
}

function doneTask(li) {
    li.classList.toggle("done");
    saveTasks();
}
function unDone(li){
    li.classList.remove("done");
    saveTasks();
}