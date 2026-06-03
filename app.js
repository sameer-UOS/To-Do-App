let tasks = [];
document.getElementById("add-btn").addEventListener("click",addTask);
loadTasks();

function addTask(){
    let input = document.getElementById("taskInput");
    let taskText = input.value;
    
    if(taskText === ""){
        alert("please Enter Task")
        return;
    }
    tasks.push({text: taskText, completed: false})
    renderTasks()
    input.value = "";

    localStorage.setItem("tasks",JSON.stringify(tasks))
}
document.addEventListener("keydown",function(event){
        if(event.key === "Enter"){
            addTask()
        }
})
function renderTasks(){
    list = document.getElementById("taskList");
    list.innerHTML = "";
    
    tasks.forEach(function(task,index){
        let li = document.createElement("li");
        li.innerText = task.text;
        li.addEventListener("dblclick",()=>{
            const newText = prompt("Edit Task:",task.text)
            if(newText !== null && newText !== ""){
                tasks[index].text = newText;
                renderTasks();
                localStorage.setItem("tasks",JSON.stringify(tasks));
            }
        })

        let button = document.createElement("button");
        button.innerText = "Delete";
        button.id = "Delete-btn";
        button.addEventListener("click",()=>{
            tasks.splice(index,1)
            renderTasks()
            localStorage.setItem("tasks",JSON.stringify(tasks))
        })
        
        let done = document.createElement("button")
        done.innerText = "Done";
        done.id = "done-btn";
        
        done.addEventListener("click",()=>{
            tasks[index].completed = true ;
            renderTasks();
        localStorage.setItem("tasks",JSON.stringify(tasks));
        })

        if(task.completed){
            li.style.textDecoration = "line-through";
        }

        li.appendChild(button);
        li.appendChild(done);
        list.appendChild(li);
    })
}

function loadTasks(){
    let saved = localStorage.getItem("tasks");
    if(saved !== null){
        tasks = JSON.parse(saved);
        renderTasks();
    }
}