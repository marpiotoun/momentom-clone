const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function init() {
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parseToDos = JSON.parse(loadedToDos);
        parseToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}


function handleDelClicked(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}
function paintToDo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement("i");
    delBtn.className = "far fa-square delBtn";
    delBtn.addEventListener('click', handleDelClicked);
    const span = document.createElement("span");
    span.innerText = text;
    const newID = toDos.length + 1;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;
    toDoList.appendChild(li)
    const toDoObj = {
        text: text,
        id: newID
    };
    toDos.push(toDoObj);
    saveToDos();
}
function handleSubmit() {
    event.preventDefault();
    const currentValue = toDoInput.value;
    if (currentValue !== '') {
        paintToDo(currentValue);
        toDoInput.value = '';
    }
}

init();