let addBtn = document.querySelector(".add");
let task = document.querySelector(".text");

let tasks = document.querySelector(".tasks");

function addTask () {
    if(task.value.trim() === "") {
        return;
    }
    else {
        let oldTasks = JSON.parse(localStorage.getItem("taskInformation")) || [];
        oldTasks.push({id: Date.now(),text: task.value, done: false});
        localStorage.setItem("taskInformation", JSON.stringify(oldTasks));
    }
}

function displayTasks() {
    tasks.innerHTML = "";

    let savedTasks = JSON.parse(localStorage.getItem("taskInformation")) || [];

    savedTasks.forEach(function(taskObject) {
        let div = document.createElement("div");
        let nestedDiv = document.createElement("div");
        let content = document.createElement("h3");
        let deleteBtn = document.createElement("button");
        let doneBtn =  document.createElement("button");

        div.appendChild(content);
        div.appendChild(nestedDiv);
        nestedDiv.appendChild(deleteBtn);
        nestedDiv.appendChild(doneBtn);

        div.className = "parentDiv";
        nestedDiv.className = "nestedDiv";

        content.textContent = taskObject.text;
        deleteBtn.textContent = "Delete";
        doneBtn.textContent = "Done";

        if (taskObject.done === true) {
            content.style.textDecoration = "line-through";
        }

        tasks.appendChild(div); 

        deleteBtn.addEventListener("click", function () {
            let savedTasks = JSON.parse(localStorage.getItem("taskInformation")) || [];
            savedTasks = savedTasks.filter(function(item) {
                return item.id !== taskObject.id;
            });
            localStorage.setItem("taskInformation", JSON.stringify(savedTasks));
            displayTasks();
        });

        doneBtn.addEventListener("click", function () {
            let savedTasks = JSON.parse(localStorage.getItem("taskInformation")) || [];
            savedTasks.forEach(function(item) {
                if (item.id === taskObject.id) {
                    item.done = true;
                }
        });
        localStorage.setItem(
                "taskInformation",
                JSON.stringify(savedTasks)
            );
            displayTasks();
        });
    });
}

addBtn.addEventListener("click", function() {
    addTask();
    displayTasks();
    task.value = "";
});

displayTasks();