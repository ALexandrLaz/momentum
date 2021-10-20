"use strict"
const time = document.querySelector(".time"),
      date = document.querySelector(".date"),
      greetingCont = document.querySelector(".greeting-container"),
      greeting = greetingCont.querySelector(".greeting"),
      userName = greetingCont.querySelector(".name");



function setTime(){
  let timeNow = new Date();
  time.textContent = timeNow.toLocaleTimeString();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  date.textContent = timeNow.toLocaleDateString('ru-RU', options);
  getTimeOfDay(timeNow.toLocaleTimeString());
  setTimeout(setTime, 1000);
}
setTime();

function getTimeOfDay(time){
  let timeSec = time.split(":").reduce((full, item, id) => {
    if(id == 0){
      full = item*3600;
    }else if(id == 1){
      full += item*60
    }else{
      full += +item
    }
    return full
  }, 0);
  (timeSec >= 21600 && timeSec <= 43119)? greeting.textContent = `Good morning` : (timeSec >= 43120 && timeSec <= 64799) ? greeting.textContent = `Good afternoon` : (timeSec >= 64800 && timeSec <= 86399) ? greeting.textContent = `Good evening` : greeting.textContent = `Good night`;
}

function setLocalStorage(){
  localStorage.setItem('userName', userName.value);
}
function getLocalStorage(){
  if(localStorage.getItem('userName')){
    userName.value = localStorage.getItem('userName');
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
