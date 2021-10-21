"use strict"
const time = document.querySelector(".time"),
      date = document.querySelector(".date"),
      greetingCont = document.querySelector(".greeting-container"),
      greeting = greetingCont.querySelector(".greeting"),
      userName = greetingCont.querySelector(".name"),
      body = document.querySelector('body'),
      imgLeft = document.querySelector(".slide-prev"),
      imgRight = document.querySelector(".slide-next"),
      city = document.querySelector(".city"),
      weatherIcon = document.querySelector('.weather-icon'),
      temperature = document.querySelector('.temperature'),
      weatherDescription = document.querySelector('.weather-description'),
      weatherHumidity = document.querySelector('.humidity'),
      weatherWindSpeed = document.querySelector('.wind');
let timeOfDay = "";
let img = getRandomNumber();
let flag = false; // Для первичной загрузки изображения и что бы не менялось с каждым вызовом функции
let cityDefault = "Минск";
let weatherIconPrew = "";

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
  if(timeSec >= 21600 && timeSec <= 43119){
    greeting.textContent = `Good morning`;
    timeOfDay = "morning";
  }else if(timeSec >= 43120 && timeSec <= 64799){
    greeting.textContent = `Good afternoon`;
    timeOfDay = "afternoon";
  }else if(timeSec >= 64800 && timeSec <= 86399){
    greeting.textContent = `Good evening`;
    timeOfDay = "evening";
  }else{
    greeting.textContent = `Good night`;
    timeOfDay = "night";
  }
  if(!flag){
    setBg(timeOfDay, img);
    flag = true;
  }
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


// Изменение фонового изображения

function getRandomNumber(min = 1, max = 20){
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function setBg(timeOfDay, img){
  let imgNow = img;
  if(String(imgNow).length == 1){
    imgNow = String(imgNow).padStart(2, "0");
  }
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${imgNow}.jpg')`;
}

// Слaйдер изображений

function getSlideNext(){
  if(img == 20){
    setBg(timeOfDay, img = 1)
  }else{
    setBg(timeOfDay, img += 1)
  }
}
function getSlidePrev(){
  if(img == 1){
    setBg(timeOfDay, img = 20)
  }else{
    setBg(timeOfDay, img -= 1)
  }
}

imgLeft.addEventListener("click", getSlidePrev);
imgRight.addEventListener("click", getSlideNext);


// Виджет погоды

async function getWeather() {
  if(localStorage.getItem("city") !== ''){
    city.value = localStorage.getItem("city");
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&lang=ru&appid=f1055dfac7e1eba1d889c75e3b05d272
&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data);
  if(weatherIcon.classList.contains(weatherIconPrew)){
    weatherIcon.classList.remove(weatherIconPrew);
  }
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weatherIconPrew = `owf-${data.weather[0].id}`
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherHumidity.innerHTML = `Влажность: ${Math.floor(data.main.humidity)}%`;
  weatherWindSpeed.innerHTML = `Скорость ветра: ${Math.floor(data.wind.speed)}м/с`;
}
getWeather();

city.addEventListener("change", changeCity);

function changeCity(){
  cityDefault = city.value;
  if(localStorage.getItem("city") == ''){
    localStorage.setItem("city", cityDefault);
    cityDefault = localStorage.getItem("city");
  }else if(localStorage.getItem("city") !== cityDefault){
    localStorage.setItem("city", cityDefault);
    cityDefault = localStorage.getItem("city");
  }
  city.value = localStorage.getItem("city");
}

function getWeatherEnter(e){
  if(e.key ==="Enter"){
    changeCity();
    getWeather();
  }
}
city.addEventListener('keydown', getWeatherEnter);
city.addEventListener("blur", getWeather);