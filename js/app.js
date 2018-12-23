const tasks = [
    "Feed the dog",
    "Wash the dishes",
    "Clean the house",
    "Water the plants"
];

const tasksDone = [
    "Watch NBA",
    "Check tutorial",
    "Exercise in the morning"
]

let tasksWrap = document.querySelector('.list-unstyled'),
    doneTasksWrap = document.querySelector('#done-items'),
    inputTask = document.getElementById('input-task'),
    btnTask = document.getElementById('addTask');

function addTask(tasks){
    let countTask = document.querySelector(".count-todos");
    tasksWrap.innerHTML = "";
    let li = "";

    for(var key in tasks){ 
        li += `<li class="ui-state-default">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" value="" ban="" data-id="${key}" class="check-item"/>${tasks[key]}
                    </label>
                </div>
            </li>`;
    }
    tasksWrap.innerHTML = li;
    countTask.innerHTML = document.querySelectorAll("ul#sortable li").length;

    checkboxLoader();
}

function doneTask(taskdone){
    doneTasksWrap.innerHTML = "";
    let li = "";

    for(var key in taskdone){
        li += `
            <li>${taskdone[key]} 
                <button class="remove-item btn btn-default btn-xs pull-right" data-id=${key}>
                    <span class="glyphicon glyphicon-remove"></span>
                </button>
            </li>
        `;
    }
    
    doneTasksWrap.innerHTML = li;

    removeDoneTasks();
}
function addTaskNow(e){
    if(e.keyCode == 13){
        if(inputTask.value !== ""){
            tasks.push(inputTask.value);
            addTask(tasks);
        } else {
            alert("Oops! You forgot to input a task!");
        }
        inputTask.value = "";
    }
}
function checkTask(id){
    if(id > -1){
        setTimeout(function(){
            tasksDone.push(tasks[id]);
            tasks.splice(id,1);
            doneTask(tasksDone);
            addTask(tasks);
        }, 500)
    }
}

inputTask.addEventListener('keypress', addTaskNow);

addTask(tasks);
doneTask(tasksDone);

function checkboxLoader(){
    let checkbox = document.getElementsByClassName('check-item');
    checkbox = Array.from(checkbox);

    for(let count = 0; count < checkbox.length; count++){
        checkbox[count].addEventListener('change', function(){
            let answer = confirm("Wait, are you ok with this?");
            if(answer){
                if(this.checked){
                    let id = this.dataset.id;
                    checkTask(id);       
                }
            } 
        });
    }
}
function removeDoneTasks(){
    let rmvBtn = document.getElementsByClassName('remove-item');
    rmvBtn = Array.from(rmvBtn);

    for(let count = 0; count < rmvBtn.length; count++){
        rmvBtn[count].addEventListener('click', function(){
            let answer = confirm("Remove this task?");
            if(answer){
                let id = this.dataset.id;
                tasksDone.splice(id, 1);
                doneTask(tasksDone);
            }
        });
    }
}



