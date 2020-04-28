const input = document.querySelector('input');
const pending_list = document.querySelector('.pending_list');
const finished_list = document.querySelector('.finished_list');
const STATUS_PENDING = 'pending';
const STATUS_FINISHED = 'finished';
toDo_LS = [];

const addToDos = (value, status) => {
    toDo_LS.push({
        "text": value,
        "status": status
    });
}

const saveToDos = () => {
    let pending_LS = [];
    let finished_LS = [];
    console.log(toDo_LS);
    toDo_LS.forEach(x => {
        if (x.status === 'pending') {
            pending_LS.push(x);
        } else if (x.status === 'finished') {
            console.log("im finish");
            finished_LS.push(x);
        }
    })
    localStorage.setItem("PENDING", JSON.stringify(pending_LS));
    localStorage.setItem("FINISHED", JSON.stringify(finished_LS));
}

const handleDelete = (e) => {
    const value = e.target.previousElementSibling.innerText;
    toDo_LS.splice(toDo_LS.findIndex(x => x.text === value), 1);
    e.target.parentElement.remove();
    saveToDos();
};
const changeStatus = (e) => {
    const value = e.target.previousElementSibling.previousElementSibling.innerText;
    const from = e.path[2].className;
    if (from === 'pending_list') {
        paintToDo(value, STATUS_FINISHED);
        toDo_LS[(toDo_LS.findIndex(x => x.text === value))].status = STATUS_FINISHED;
    } else if (from === 'finished_list') {
        paintToDo(value, STATUS_PENDING);
        toDo_LS[(toDo_LS.findIndex(x => x.text === value))].status = STATUS_PENDING;
    }
    saveToDos();
    e.target.parentElement.remove();
}
const paintToDo = (text, to) => {
    const toDo = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    const changeStatusBtn = document.createElement('button');

    delBtn.addEventListener('click', handleDelete);
    delBtn.innerText = 'X';
    span.innerText = text;
    toDo.appendChild(span);
    toDo.appendChild(delBtn);
    toDo.appendChild(changeStatusBtn);

    if (to === 'pending') {
        changeStatusBtn.addEventListener('click', changeStatus);
        changeStatusBtn.innerText = '▼';
        pending_list.appendChild(toDo);
    } else if (to === 'finished') {
        changeStatusBtn.addEventListener('click', changeStatus);
        changeStatusBtn.innerText = '▲';
        finished_list.appendChild(toDo);
    }
};
const loadTodos = () => {
    const pending_LS = JSON.parse(localStorage.getItem('PENDING'));
    const finished_LS = JSON.parse(localStorage.getItem('FINISHED'));
    toDo_LS = pending_LS !== null ? (finished_LS !== null ? pending_LS.concat(finished_LS) : pending_LS)
        : (finished_LS !== null ? finished_LS : [])
    toDo_LS.forEach(toDo => {
        paintToDo(toDo.text, toDo.status)
    });
};
loadTodos();

const handleSubmit = e => {
    const value = e.target.value;
    if (e.keyCode === 13 & e.target.value !== "" & toDo_LS.find(x => x.text === value) === undefined) {
        paintToDo(value, STATUS_PENDING);
        addToDos(value, STATUS_PENDING);
        saveToDos();
        e.target.value = null;
    }
};
input.addEventListener('keydown', handleSubmit);
