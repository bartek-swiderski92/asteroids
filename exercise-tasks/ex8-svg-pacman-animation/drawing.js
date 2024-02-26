/** @format */
import svg_ from '../modules/svg-game.js';
import {PacMan} from '../modules/objects.js';

const asteroidsNode = document.querySelector('#asteroids');

const pacman = new PacMan(150, 150, 20, 120);

function draw() {
    pacman.draw();
}

function update(elapsed) {
    pacman.update(elapsed, 300, 300);
}

let previous, elapsed;

function frame(timestamp) {
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    update(elapsed / 1000);
    draw();
    previous = timestamp;
    // window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
