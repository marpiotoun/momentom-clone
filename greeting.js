const form = document.querySelector('.js-greeting'),
    input_USERNAME = form.querySelector('input'),
    h1 = form.querySelector('h1');
const DP_SHOW = 'show',
    DP_HIDE = 'hide';
const USER_LS = "currentUser";

function loadName(){
    const current_user = localStorage.getItem(USER_LS);
    if (current_user === null){
        get_user_name();
    }else{
        paintName(current_user);
    }
}
function get_user_name(){
    form.addEventListener('submit',handleSubmit);
}

function handleSubmit(event){
    event.preventDefault();
    const USERNAME = input_USERNAME.value;
    paintName(USERNAME);
    save_USERNAME(USERNAME);
}
function paintName(USERNAME){
    input_USERNAME.className = DP_HIDE;
    h1.innerText = `Hello ${USERNAME}`;
    form.querySelector('h1').classList.add(DP_SHOW);
}
function save_USERNAME(USERNAME){
    localStorage.setItem('currentUser',USERNAME);
}
loadName();