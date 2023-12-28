/** @format */

const canvas_ = {};
const canvas_private = {};

canvas_.drawGrid = function (context, minor = 10, major = minor * 5, stroke = '#00FF00', fill = '#009900') {
    context.save();
    context.strokeStyle = stroke;
    context.fillStyle = fill;
    let width = context.canvas.width;
    let height = context.canvas.height;
    for (let x = 0; x < width; x += minor) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        if (x % major === 0) {
            context.lineWidth = 0.5;
            context.fillText(x, x, 10);
        } else {
            context.lineWidth = 0.25;
        }
        context.stroke();
    }

    for (let y = 0; y < height; y += minor) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        if (y % major === 0) {
            context.lineWidth = 0.5;
            context.fillText(y, 0, y + 10);
        } else {
            context.lineWidth = 0.25;
        }
        context.stroke();
    }

    context.restore();
};

canvas_.drawShip = function (ctx, radius, options) {
    options = options || {};
    let angle = (options.angle || 0.5 * Math.PI) / 2;
    let curve1 = options.curve1 || 0.25;
    let curve2 = options.curve1 || 0.75;

    ctx.save();

    // Optionally draw a guide showing the collision radius
    if (options.guide) {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    // Set some default values
    ctx.lineWidth = options.lineWidth || 2;
    ctx.strokeStyle = options.stroke || 'white';
    ctx.fillStyle = options.fill || 'black';

    // Draw the ship in three lines;
    ctx.beginPath();
    ctx.moveTo(radius, 0);

    ctx.quadraticCurveTo(Math.cos(angle) * radius * curve2, Math.sin(angle) * radius * curve2, Math.cos(Math.PI - angle) * radius, Math.sin(Math.PI - angle) * radius);
    ctx.quadraticCurveTo(-radius * curve1, 0, Math.cos(Math.PI + angle) * radius, Math.sin(Math.PI + angle) * radius);
    ctx.quadraticCurveTo(Math.cos(-angle) * radius * curve2, Math.sin(-angle) * radius * curve2, radius, 0);
    ctx.fill();
    ctx.stroke();

    if (options.guide) {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(Math.cos(-angle) * radius, Math.sin(-angle) * radius);
        ctx.lineTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.stroke();
        ctx.moveTo(-radius, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(Math.cos(angle) * radius * curve2, Math.sin(angle) * radius * curve2, radius / 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(Math.cos(-angle) * radius * curve2, Math.sin(-angle) * radius * curve2, radius / 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(radius * curve2 - radius, 0, radius / 50, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.restore();
};

canvas_.drawAsteroid = function (ctx, radius, segments, options) {
    options = options || {};
    ctx.strokeStyle = options.stroke || 'white';
    ctx.fillStyle = options.fill || 'black';
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < segments; i++) {
        ctx.rotate((2 * Math.PI) / segments);
        ctx.lineTo(radius, 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (options.guide) {
        ctx.lineWIdth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    ctx.restore();
};

export default canvas_;
