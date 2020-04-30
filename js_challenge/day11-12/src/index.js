// 모든 btn을 querySelector로 불러온다.
const calculator_wrap = document.querySelector('.calculator_wrap');
const calculator_display = calculator_wrap.querySelector('.calculator_display');
const calculator_btn = calculator_wrap.querySelectorAll('.calculator_btn');
const clear_btn = calculator_wrap.querySelector('.clear_btn');
const number_btn = calculator_wrap.querySelectorAll('.number_btn');
const execute_btn = calculator_wrap.querySelector('.execute_btn');
const opration_btn = calculator_wrap.querySelectorAll('.opration_btn');

// 모든 btn에 눌렸을 때 background-color를 변화시키기 위해 clicked classname toggle
const handleButtonMouseDown = e => {
    e.target.classList.toggle('clicked')
};
const handleButtonMouseUp = e => {
    e.target.classList.toggle('clicked')
}
calculator_btn.forEach(btn => {
    btn.addEventListener('mousedown', handleButtonMouseDown);
    btn.addEventListener('mouseup', handleButtonMouseUp)
})

//숫자를 입력받는 로직
let oneNumberUserInput = 0;
const numberInput = (e) => {
    if (numberListToOperate === 0) {
        total = 0;
    } // 계산이 끝난 후 연산자 클릭 없이 숫자를 누르면 total = 0 으로 초기화.
    oneNumberUserInput = oneNumberUserInput * 10 + Number(e.target.innerText);
    calculator_display.innerText = oneNumberUserInput;
}
number_btn.forEach(btn => {
    btn.addEventListener('click', numberInput);
});

// 연산자가 입력되었을 경우의 로직
let numberListToOperate = [];

const oprationInput = (e) => {
    if (oneNumberUserInput === 0 & total !== 0) {
        oneNumberUserInput = total;
        total = 0;
    } // 기존의 total 값을 가지고 이어서 연산을 진행하려는 경우, total값을 oneNumberUserInput으로 넘기고 0으로 초기화.
    numberListToOperate.push(oneNumberUserInput);
    numberListToOperate.push(e.target.innerText);
    oneNumberUserInput = 0;
}
opration_btn.forEach(btn => {
    btn.addEventListener('click', oprationInput);
})

// = 가 입력되었을 경우의 로직
let total = 0;
const executeCalculation = () => {
    numberListToOperate.push(oneNumberUserInput);
    oneNumberUserInput = 0;
    if (numberListToOperate.length === 1) {
        total = numberListToOperate.shift();
        calculator_display.innerText = total;
        return 0;
    } else {
        total = numberListToOperate.shift();
        while (numberListToOperate.length !== 0) {
            let operator = numberListToOperate.shift();
            let number = numberListToOperate.shift();
            if (number === undefined) {
                number = 0;
            } else if (operator === "+") {
                total += number;
            } else if (operator === "-") {
                total -= number;
            } else if (operator === "*") {
                total *= number;
            } else if (operator === "/") {
                total /= number;
            }
        }
        calculator_display.innerText = total;
    }
}
execute_btn.addEventListener('click', executeCalculation);

// clear 로직
const handleClear = () => {
    oneNumberUserInput = 0;
    numberListToOperate = [];
    total = 0;
    calculator_display.innerText = oneNumberUserInput;
}
clear_btn.addEventListener('click', handleClear);