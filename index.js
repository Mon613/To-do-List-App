document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task.text, task.done));
}

function renderTask(taskText, done = false) {
    let d = new Date();
    let li = document.createElement("li");
    let span = document.createElement("span");
    let date = document.createElement("p")
    span.innerText = taskText;
    span.contentEditable = true;
    span.addEventListener("input", saveTasks);
    // date.innerText = d.toLocaleString('vi', {
    //         dateStyle: 'short',
    //         timeStyle: 'medium',
    //         timeZone: 'Asia/Ho_Chi_Minh',
    // });
    
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.onclick = () => doneTask(li);
    
    let undoneBtn = document.createElement("button");
    undoneBtn.innerText = "Undone";
    undoneBtn.onclick = () => unDone(li);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteTask(li);
    
    li.append(span, doneBtn, undoneBtn, deleteBtn);
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
    }else{
        alert("Vui lòng nhập task!")
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