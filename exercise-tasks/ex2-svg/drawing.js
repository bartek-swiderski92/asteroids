/** @format */
import data from '../data/shapes.json' assert {type: 'json'};
const asteroids = document.querySelector('#asteroids');
const shapes = data.shapes;

function drawGridAttribute(minor = 10, major = minor * 5, lineColor = '#00FF00', textColor = '#009900') {
    const boardWidth = asteroids.clientWidth;
    const boardHeight = asteroids.clientHeight;

    for (let x = 0; x < boardWidth; x += minor) {
        const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const coordinate = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lineEl.setAttribute('x1', x);
        lineEl.setAttribute('y1', 0);
        lineEl.setAttribute('x2', x);
        lineEl.setAttribute('y2', boardHeight);
        if (x % major === 0) {
            coordinate.setAttribute('x', x);
            coordinate.setAttribute('y', 10);
            coordinate.setAttribute('fill', textColor);
            coordinate.setAttribute('font-size', '10');
            coordinate.innerHTML = x;
            coordinate.setAttribute('stroke-width', 1);
            asteroids.appendChild(coordinate);
        } else {
            lineEl.setAttribute('stroke-width', 0.5);
        }
        lineEl.setAttribute('stroke', lineColor);

        asteroids.appendChild(lineEl);
    }

    for (let y = 0; y < boardHeight; y += minor) {
        const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineEl.setAttribute('x1', 0);
        lineEl.setAttribute('y1', y);
        lineEl.setAttribute('x2', boardWidth);
        lineEl.setAttribute('y2', y);
        if (y % major === 0) {
            const coordinate = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            coordinate.setAttribute('x', 0);
            coordinate.setAttribute('y', y + 10);
            coordinate.setAttribute('fill', textColor);
            coordinate.setAttribute('font-size', '10');
            coordinate.innerHTML = y;
            asteroids.appendChild(coordinate);
            coordinate.setAttribute('stroke-width', 1);
        } else {
            lineEl.setAttribute('stroke-width', 0.5);
        }
        lineEl.setAttribute('stroke', lineColor);

        asteroids.appendChild(lineEl);
    }
}

function drawGrid(minor = 10, major = minor * 5, lineColor = '#00FF00', textColor = '#009900') {
    const boardWidth = asteroids.clientWidth;
    const boardHeight = asteroids.clientHeight;

    for (let x = 0; x < boardWidth; x += minor) {
        let lineEl;
        if (x % major === 0) {
            let coordinates = /*html*/ `<text x="${x}" y="10" fill="${textColor}" font-size="10">${x}</text>`;
            asteroids.innerHTML += coordinates;
            lineEl = /*html*/ `<line x1="${x}" y1="0" x2="${x}" y2="${boardHeight}" stroke=${lineColor} stroke-width="1"/>`;
        } else {
            lineEl = /*html*/ `<line x1="${x}" y1="0" x2="${x}" y2="${boardHeight}" stroke=${lineColor} stroke-width=".5"/>`;
        }
        asteroids.innerHTML += lineEl;
    }

    for (let y = 0; y < boardHeight; y += minor) {
        let lineEl;
        if (y % major === 0) {
            let coordinates = /*html*/ `<text x="0" y="${y + 10}" fill="${textColor}" font-size="10">${y}</text>`;
            lineEl = /*html*/ `<line x1="0" y1="${y}" x2="${boardWidth}" y2="${y}" stroke=${lineColor} stroke-width="1"/>`;
            asteroids.innerHTML += coordinates;
        } else {
            lineEl = /*html*/ `<line x1="0" y1="${y}" x2="${boardWidth}" y2="${y}" stroke=${lineColor} stroke-width=".5"/>`;
        }

        asteroids.innerHTML += lineEl;
    }
}

function drawLinesTo(coordinates, color = 'white') {
    if (Array.isArray(coordinates) === true && coordinates.length > 1) {
        let outputString = '';
        for (let i = 0; i < coordinates.length; i++) {
            const startingPoint = coordinates[i];
            const endingPoint = coordinates[i + 1];

            if (i + 1 < coordinates.length) {
                outputString += /*html*/ `<line x1="${startingPoint.x}" y1="${startingPoint.y}" x2="${endingPoint.x}" y2="${endingPoint.y}" stroke="${color}"  />`;
            }
        }
        return outputString;
    }
}

function drawPaths(coordinates, closed = true, color = 'white', fill = 'transparent', strokeWidth = '2') {
    if (Array.isArray(coordinates) === true && coordinates.length > 1) {
        let dAttribute = '';
        let outputElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        outputElement.setAttribute('fill', fill);
        outputElement.setAttribute('stroke', color);
        outputElement.setAttribute('stroke-width', strokeWidth);

        for (let i = 0; i < coordinates.length; i++) {
            const startingPoint = coordinates[i];

            dAttribute += i === 0 ? 'M ' : 'L ';
            dAttribute += `${startingPoint.x} ${startingPoint.y} `;
        }
        dAttribute += closed ? 'z' : '';
        outputElement.setAttribute('d', dAttribute);
        return outputElement;
    }
}

function drawCoordinates(coordinates, color = 'white', fontSize = 8) {
    if (Array.isArray(coordinates) === true) {
        let outputString = '';
        for (let i = 0; i < coordinates.length; i++) {
            const coordinate = coordinates[i];
            outputString += /*html*/ `<text x="${coordinate.textX ?? coordinate.x}" y="${coordinate.textY ?? coordinate.y}" fill="${color}" font-size="${fontSize}">(${coordinate.x}, ${coordinate.y})</text>`;
        }
        return outputString;
    }
}

function drawStraightShapes(shapes) {
    shapes.forEach((shape) => {
        asteroids.appendChild(drawPaths(shape.coordinates, true, shape.lineColor, shape.fillColor));
        if (shape.drawCoordinates != undefined) {
            console.log('here');
            asteroids.innerHTML += drawCoordinates(shape.coordinates, shape.fontColor);
        }
    });
}

function drawCurvedShapes() {}

drawGrid();
drawStraightShapes(shapes);
drawCurvedShapes(shapes);
