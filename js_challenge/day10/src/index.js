const body = document.querySelector('body');

const rangeDisplay = body.querySelector('.js-range')

const form = document.querySelector('.game_form');
const rangeInput = form.querySelector('.js-rangeInput');
const numberInput = form.querySelector('.js-guess');
const submitBtn = form.querySelector('.submit');

let rangeNumber = Number(rangeInput.value);
let randomNumber = Math.ceil(Math.random() * rangeNumber);
let choosenNumber = undefined;

rangeDisplay.innerHTML = `Generate a number between 0 and ${rangeNumber}`;

const handleRangeChange = e => {
    rangeNumber = Number(rangeInput.value);
    rangeDisplay.innerHTML = `Generate a number between 0 and ${rangeNumber}`;
    randomNumber = Math.ceil(Math.random() * rangeNumber);
}

const handleNumberChange = e => {
    choosenNumber = Number(e.target.value);
}

const paintResult = result => {
    const resultWrap = document.createElement('div')
    const resultDetailSpan = document.createElement('span');
    const resultBoard = document.createElement('h4');
    resultDetailSpan.innerText = `You chose: ${choosenNumber}, the machine chose: ${randomNumber}`
    resultBoard.innerText = `You ${result}`;
    resultWrap.appendChild(resultDetailSpan);
    resultWrap.appendChild(resultBoard);
    resultWrap.className = 'resultBox'
    body.appendChild(resultWrap);
}

const compareNumber = () => {
    let result = 'lose';
    if (choosenNumber === randomNumber) {
        result = 'won!';
    }
    return result;
}

const deletePreviousResult = () => {
    document.querySelector('.resultBox').remove();
}

const handleSubmit = () => {
    if (document.querySelector('.resultBox') !== null) {
        deletePreviousResult();
    }
    if (choosenNumber !== undefined) {
        choosenNumber = choosenNumber >= 0 ?
            (choosenNumber <= rangeNumber ? choosenNumber : rangeNumber) : 0;
        numberInput.value = choosenNumber;
        handleRangeChange();
        paintResult(compareNumber());
    }
}

rangeInput.addEventListener('input', handleRangeChange);
numberInput.addEventListener('change', handleNumberChange);
numberInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
    }
});
submitBtn.addEventListener('click', handleSubmit);
