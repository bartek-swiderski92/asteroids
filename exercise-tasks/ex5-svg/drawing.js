/** @format */
import svg_ from '../modules/svg-game.js';

const asteroids = document.querySelector('#asteroids');

svg_.drawGrid(asteroids);

const position = 200;
const radius = 150;

// svg_.drawShip(asteroids, position, radius, {guide: true, curve1: 0.25, curve2: 0.75});

svg_.drawAsteroid(asteroids);
