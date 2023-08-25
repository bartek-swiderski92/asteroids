/** @format */

function drawGrid(context, minor = 10, major = minor * 5, stroke = '#00FF00', fill = '#009900') {
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
}
