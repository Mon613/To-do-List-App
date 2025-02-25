document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task.text, task.done));
}

function renderTask(taskText, done = false) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = taskText;
    span.contentEditable = true;
    span.addEventListener("input", saveTasks);
    
    if (done) li.classList.add("done");
    
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.onclick = () => toggleTask(li);
    
    const undoneBtn = document.createElement("button");
    undoneBtn.innerText = "Undone";
    undoneBtn.onclick = () => unDone(li);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteTask(li);
    
    li.append(span, doneBtn, undoneBtn, deleteBtn);
    document.getElementById("taskList").prepend(li);
}

function saveTasks() {
    const tasks = [...document.querySelectorAll("li")].map(li => ({
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
    const input = document.getElementById("taskName");
    if (input.value.trim()) {
        renderTask(input.value);
        saveTasks();
        input.value = "";
    }
}

function toggleTask(li) {
    li.classList.toggle("done");
    saveTasks();
}
function unDone(li){
    li.classList.remove("done");
    saveTasks();
}