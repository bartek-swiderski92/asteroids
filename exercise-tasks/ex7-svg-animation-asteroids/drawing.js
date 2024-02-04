/** @format */
import svg_ from '../modules/svg-game.js';
import svg_pacman from '../modules/svg.js';

const asteroids = document.querySelector('#asteroids');

let radius = 40;
let x = 0,
    startX = 0,
    // startX = svg_.getRandomNumber(radius, asteroids.clientWidth - radius),
    xSpeed = 1.5,
    increasingX = true;

let y = asteroids.clientWidth / 5,
    startY = 0,
    ySpeed = 0,
    increasingY = true,
    gravity = 0.1;

let mouth = 0;
const pacman = {
    x: startX,
    y: startY,
    radius: radius,
    mouthAngle: 45,
    fill: 'yellow'
};

svg_.drawGrid(asteroids);
// svg_pacman.drawPacman(pacman);
svg_pacman.animatePacman(pacman, 5);
// let circleEl = svg_.drawCircle(startX, radius, radius, 'circle', 'black', 'white', 1.5);
// asteroids.appendChild(circleEl);

function frame() {
    draw();
    update();
}

function update() {
    x += xSpeed;
    y += ySpeed;
    ySpeed += gravity;

    if (y >= asteroids.clientHeight - radius) {
        //if you hit bottom
        y = asteroids.clientHeight - radius;
        ySpeed *= -0.6; // move up instead of down
        xSpeed = 1.5;
    }

    if (x <= 0 || x >= asteroids.clientWidth) {
        x = (x + asteroids.clientWidth) % asteroids.clientWidth;
    }
    mouth = Math.abs(Math.sin((6 * Math.PI * x) / asteroids.clientWidth));
}

function draw() {
    // let circle = document.querySelector('.circle');
    // circle.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
    let pacman = document.querySelector('#pacman');
    pacman.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
}

setInterval(frame, 1000 / 60);

// ----- > Bouncing ball < -----
// import svg_ from '../modules/svg-game.js';

// const asteroids = document.querySelector('#asteroids');

// let radius = 50;
// let x = 0;
// let startX = svg_.getRandomNumber(radius, asteroids.clientWidth - radius);
// let increasingX = true;
// let y = 0;
// let increasingY = true;
// let currentSpeed = 1;
// let acceleration = 1.02;

// svg_.drawGrid(asteroids);
// let circleEl = svg_.drawCircle(startX, radius, radius, 'circle', 'black', 'white', 1.5);
// asteroids.appendChild(circleEl);
// function frame() {
//     draw();
//     update();
// }

// function update() {
//     x = increasingX ? x + currentSpeed : x - currentSpeed;
//     y = increasingY ? y + currentSpeed : y - currentSpeed;

//     if (y >= asteroids.clientHeight - radius * 2 || y <= 0) {
//         increasingY = !increasingY;
//         currentSpeed *= acceleration;
//     }

//     if (x + startX + radius >= asteroids.clientWidth || x + startX - radius <= 0) {
//         increasingX = !increasingX;
//         currentSpeed *= acceleration;
//     }
// }

// function draw() {
//     let circle = document.querySelector('.circle');
//     circle.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
// }

// setInterval(frame, 1000 / 60);
