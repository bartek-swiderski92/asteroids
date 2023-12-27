/** @format */
import svg_ from '../modules/svg-game.js';

const asteroids = document.querySelector('#asteroids');

svg_.drawGrid(asteroids);
// svg_.drawShip(asteroids, 125, {guide: true});

// let t = asteroids.clientWidth;
// let r = Math.PI / 500;

// let path = document.querySelector('path');
// path.style.display = 'none';
svg_.drawShip(asteroids, 200, 200, 150, {guide: true, rotate: 0.8});

// transforming ships across the grid
// let rotateValue = 0;
// for (let y = 0; y < 400; y += 40) {
//     for (let x = 0; x < 400; x += 40) {
//         if (y === 0 && x === 0) continue;
//         rotateValue += 1.5;
//         let ogShip = document.querySelector('path');
//         let ogCircle = document.querySelector('circle');
//         let clonedShip = ogShip.cloneNode(true);
//         let clonedCircle = ogCircle.cloneNode(true);
//         clonedShip.setAttribute('transform', `translate(${x}, ${y}) rotate(${rotateValue}, 20, 20)`);
//         clonedCircle.setAttribute('transform', `translate(${x}, ${y})`);
//         asteroids.appendChild(clonedShip);
//         asteroids.appendChild(clonedCircle);
//     }
// }
