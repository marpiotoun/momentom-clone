const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    //get the current date
    const date = new Date;
    const min = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${min < 10 ? `0${min}` : min} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    
}
function init(){
    getTime();
    setInterval(getTime,1000);
}



init();