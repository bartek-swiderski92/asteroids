/** @format */

/** @format */
import canvas_ from '../modules/canvas.js';

const context = document.getElementById('asteroids').getContext('2d');
canvas_.drawGrid(context);

let segments = 1;

for (let x = 0.25; x < 1; x += 0.5) {
    for (let y = 0.25; y < 1; y += 0.5) {
        segments += 2;
        context.save();
        context.translate(context.canvas.width * x, context.canvas.height * y);
        canvas_.drawAsteroid(context, 60, segments, {guide: true});
        context.restore();
    }
}
