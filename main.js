
const todform = document.querySelector("#todform");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");


document.addEventListener("DOMContentLoaded", loadTasks)
 function loadTasks(){
    const tasks = getTasksFromLocalStorage()
    tasks.forEach(task => {
        addTaskTodom(task);  
    });

 }



// adding submit
todform.addEventListener("submit", addTask)
function addTask(e){
  e.preventDefault()

 const textTask = todoInput.value.trim();
  if (textTask !== "") {
    const task = {
      id: Date.now(),
      text: textTask,
      complete: false,
    };

    // Adding to the DOOM

    addTaskTodom(task);
    todoInput.value = "";
    savetasktoLocalStorage(task)
  
  }
}

function addTaskTodom(task) {
  const li = document.createElement("li");
  li.className = `todoItem ${task.completed ? "completed" : ""}`;
  li.dataset.id = task.id;
  li.innerHTML= 
  `
   <input type="checkbox" class="checkboxCompeleted">
     <span class="Tasks" >${task.text}</span>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>`

    todoList.appendChild(li)
    attachEventListeners(li , task)

}


function attachEventListeners(li, task){
  const deleteBtn = li.querySelector(".deleteBtn");
  const editBtn = li.querySelector(".editBtn");
  const checkbox = li.querySelector(".checkboxCompeleted")


   deleteBtn.addEventListener('click', function(){

    halndleDelete(task.id, li)
  })


  editBtn.addEventListener('click', function(){

    halndleEdit(task.id, li)
  })

  checkbox.addEventListener("change", function() {
    toggleTaskCompletion(task.id, li, checkbox.checked);
  });


}

function halndleEdit(taskId, li){
  const taskSpan = li.querySelector(".Tasks")
  const newTasks = prompt("Edit Your Task:",taskSpan.textContent)


  if(newTasks !== null && newTasks.trim() !== ""){

    // update localStorage 
    updateTask(taskId, newTasks)

    // Update DOOM 
    taskSpan.textContent = newTasks
  }
}




function halndleDelete(id, li){
  let tasks = getTasksFromLocalStorage()
  tasks = tasks.filter(task => task.id != id)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  li.remove()
}


function updateTask(id, newTasks){
  const tasks = getTasksFromLocalStorage()
  const task = tasks.find(task => task.id == id)
  if(task){
    task.text = newTasks
    localStorage.setItem ('tasks', JSON.stringify(tasks))
  }
}


function toggleTaskCompletion(taskId, li, isCompleted){
  const tasks = getTasksFromLocalStorage()
  const task = tasks.find(task => task.id == taskId)
  if(task){
    task.completed = isCompleted
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.classList.toggle("completed",  isCompleted)
  }
}


function savetasktoLocalStorage(task){
    const oldTask = getTasksFromLocalStorage()
    oldTask.push(task)
    localStorage.setItem("tasks", JSON.stringify(oldTask))
}

function getTasksFromLocalStorage(){
  const oldTask = JSON.parse(localStorage.getItem("tasks")) || []
  return oldTask
}