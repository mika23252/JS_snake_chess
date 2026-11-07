"use strict";

let i = 0;

let colors = ['#ff5353', '#53a4ff', '#d053ff', '#53ff8b']

function changeGradient() {
    let button = document.querySelector('.justButton');
    i++;
    
    let index = Math.floor(Math.random() * 4);
    if (i == 2) {
        button.style.outline = `1px solid ${colors[index]}`;
        button.style.background = 'white';
        button.style.color = 'black';
        i = -1;
    } else {
        button.setAttribute('style', '');
        button.className = `justButton gradient${i}`;
    }
}

function menuFunc() {
    let menu = document.querySelector('.playmenu');
    menu.className = 'playmenu fadeIn';
    menu.style.display = 'flex';
    setTimeout(() => menu.style.filter = 'none', 1000);
    setTimeout(() => menu.style.opacity = '1', 1000);
    setTimeout(() => menu.style.marginTop = '0', 1000);
    setTimeout(() => menu.classList = 'playmenu', 1000);
}


function givePlayMenu() {
    let playbutton = document.querySelector('.playButton');
    playbutton.className = 'playButton fadeOut';
    setTimeout(() => playbutton.style.display = 'none', 900);
    setTimeout(menuFunc, 900);
}
