/** @format */
import svg_ from '../modules/svg-game.js';

const asteroids = document.querySelector('#asteroids');

svg_.drawGrid(asteroids);
svg_.drawShip(asteroids, 125, {guide: true});

let t = asteroids.clientWidth;
let r = Math.PI / 500;

let path = document.querySelector('path');
path.style.display = 'none';
