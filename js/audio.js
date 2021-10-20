"use strict"
const playPrev = document.querySelector(".play-prev"),
      playPause = document.querySelector(".player .play"),
      playNext = document.querySelector(".play-next"),
      playlist = document.querySelector(".play-list");

let audLink = ['Aqua Caelestis.mp3', 'Ennio Morricone.mp3','River Flows In You.mp3', 'Summer Wind.mp3'];

function ce(elem, url, parent, classN){
  for(let song of url){
    let nameElem = document.createElement(elem);
    nameElem.url = `../assets/sounds/${song}`;
    console.log(nameElem);
    if(classN != undefined){
      nameElem.classList.add(classN);
    }
    parent.appendChild(nameElem);
  }
}
