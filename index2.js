document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks2(){
    let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.forEach(task => renderTask(task.text,task.cone))
}