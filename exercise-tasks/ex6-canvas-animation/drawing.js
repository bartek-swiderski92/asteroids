/** @format */

import canvas_ from '../modules/canvas.js';

const context = document.getElementById('asteroids').getContext('2d');
context.strokeStyle = 'white';
context.lineWidth = 1.5;
let x = 120,
    y = context.canvas.height / 5,
    radius = 20,
    xSpeed = 1.5,
    ySpeed = 0,
    gravity = 0.1,
    mouth = 0;

function frame() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    draw(context);
    update();
}

function update() {
    x += xSpeed;
    y += ySpeed;
    ySpeed += gravity;
    if (y >= context.canvas.height - radius) {
        y = context.canvas.height - radius; //add an extra radius
        ySpeed *= -0.6; // reverse and slowDown
        xSpeed *= -0.95; // just slow down a bit
    }
    if (x <= 0 || x >= context.canvas.width) {
        x = (x + context.canvas.width) % context.canvas.width;
    }
    mouth = Math.abs(Math.sin((5 * Math.PI * x) / context.canvas.width));
}

function draw(context) {
    canvas_.drawGrid(context);
    // context.beginPath();
    // context.arc(x, y, 40, 0, 2 * Math.PI);
    // context.fill();
    // context.stroke();
    context.save();
    context.translate(x, y);
    canvas_.drawPacman(context, 0, 0, radius, mouth);
    context.restore();
}

// setInterval(frame, 1000 / 60);
