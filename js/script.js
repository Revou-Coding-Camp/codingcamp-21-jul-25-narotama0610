console.log("Script loaded successfully");

let tasks = [];
let editIndex = null;

// Render tasks with optional filtering
function renderTasks() {
    const todoList = document.querySelector("#todo-list ul");
    const keywordInput = document.getElementById("filter-keyword");
    const dateInput = document.getElementById("filter-date");

    // Get filter values if filter fields exist
    const keyword = keywordInput ? keywordInput.value.toLowerCase() : "";
    const date = dateInput ? dateInput.value : "";

    todoList.innerHTML = "";
    tasks.forEach((task, index) => {
        const matchesKeyword = task.task.toLowerCase().includes(keyword);
        const matchesDate = !date || task.date === date;
        if (matchesKeyword && matchesDate) {
            const li = document.createElement("li");
            li.className = "bg-white text-gray-500 p-4 rounded-md shadow-md flex justify-between items-center";
            li.innerHTML = `
                <span>${task.task} <span class="text-gray-400 text-sm ml-2">${task.date}</span></span>
                <div class="flex gap-2 ml-auto">
                    <button class="text-red-500 hover:text-red-700" onclick="editTask(${index})">Edit</button>
                    <button class="text-red-500 hover:text-red-700" onclick="removeTask(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        }
    });

    // Reset button to Add Task if not editing
    const addBtn = document.getElementById("add-task-btn");
    if (addBtn) {
        addBtn.textContent = editIndex === null ? "Add Task" : "Update Task";
    }
}

function addTask() {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    // Validation: both fields must be filled
    if (!taskInput.value.trim() || !dateInput.value) {
        alert("Both Task and Due Date must be filled!");
        return;
    }

    if (editIndex === null) {
        // Add new task
        tasks.push({
            task: taskInput.value,
            date: dateInput.value
        });
    } else {
        // Update existing task
        tasks[editIndex] = {
            task: taskInput.value,
            date: dateInput.value
        };
        editIndex = null;
    }

    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    // If deleting the task being edited, reset editIndex
    if (editIndex === index) editIndex = null;
    renderTasks();
}

function editTask(index) {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");
    taskInput.value = tasks[index].task;
    dateInput.value = tasks[index].date;
    editIndex = index;
    renderTasks();
}

// Filter tasks when filter fields change
function filterTasks() {
    renderTasks();
}

// Attach filter event listeners after DOM loaded
document.addEventListener("DOMContentLoaded", function() {
    renderTasks();
    const keywordInput = document.getElementById("filter-keyword");
    const dateInput = document.getElementById("filter-date");
    if (keywordInput) keywordInput.addEventListener("input", filterTasks);
    if (dateInput) dateInput.addEventListener("input", filterTasks);
});