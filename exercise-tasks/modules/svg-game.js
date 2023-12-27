/** @format */

const svg_ = {};
const svg_private = {};

svg_.drawGrid = function (asteroids, minor = 10, major = minor * 5, lineColor = '#00FF00', textColor = '#009900') {
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
};

svg_.drawLine = function (asteroids, x1, y1, x2, y2, lineWidth, stroke, fill) {
    let lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineEl.setAttribute('x1', x1);
    lineEl.setAttribute('x2', x2);
    lineEl.setAttribute('y1', y1);
    lineEl.setAttribute('y2', y2);
    lineEl.setAttribute('stroke-width', lineWidth);
    lineEl.setAttribute('stroke', stroke);

    asteroids.appendChild(lineEl);
};

svg_.drawPath = function (asteroids, coordinates, strokeWidth, stroke, fill, closed) {
    if (Array.isArray(coordinates) === true && coordinates.length > 1) {
        let dAttribute = '';
        let outputElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        outputElement.setAttribute('fill', fill);
        outputElement.setAttribute('stroke', stroke);
        outputElement.setAttribute('stroke-width', strokeWidth);

        for (let i = 0; i < coordinates.length; i++) {
            const {x, y} = coordinates[i];

            dAttribute += i === 0 ? 'M ' : 'L ';
            dAttribute += `${x} ${y}, `;
        }
        dAttribute += closed ? 'z' : '';
        outputElement.setAttribute('d', dAttribute);
        asteroids.appendChild(outputElement);
    }
};

svg_.drawShipPaths = function (asteroids, position, radius, angle, curve, guide, strokeWidth, stroke, fill) {
    let dAttribute = 'M ';
    let outputElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    outputElement.setAttribute('class', 'ship');
    outputElement.setAttribute('fill', fill);
    outputElement.setAttribute('stroke', stroke);
    outputElement.setAttribute('stroke-width', strokeWidth);

    let firstPath = `${position + radius} ${position} ${position + Math.cos(Math.PI - angle) * radius} ${position + Math.sin(Math.PI - angle) * radius} `;
    let secondPath = `Q ${position * curve} ${position} ${position + Math.cos(Math.PI + angle) * radius} ${position + Math.sin(Math.PI + angle) * radius} `;
    let thirdPath = `L ${position + radius} ${position}`;
    dAttribute += firstPath + secondPath + thirdPath;
    outputElement.setAttribute('d', dAttribute);
    asteroids.appendChild(outputElement);

    if (guide) {
        svg_.drawGuide(asteroids, position, radius, curve);
    }
};

svg_.drawCircle = function (x, y, radius, curve, fill = 'rgba(0, 0, 0, 0.405)', stroke = 'white', strokeWidth = '0.5px') {
    let circleEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleEl.setAttribute('fill', fill);
    circleEl.setAttribute('stroke', stroke);
    circleEl.setAttribute('stroke-width', strokeWidth);
    circleEl.setAttribute('cx', x);
    circleEl.setAttribute('cy', y);
    circleEl.setAttribute('r', radius);

    return circleEl;
};

svg_.drawGuide = function (asteroids, position, radius, curve) {
    let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    let dAttribute = '';
    pathEl.setAttribute('fill', 'white');
    pathEl.setAttribute('stroke', 'white');
    pathEl.setAttribute('stroke-width', '0.5px');
    pathEl.setAttribute('class', 'guide-line');

    dAttribute = `M ${position} ${position} ${position - radius} ${position}`;
    pathEl.setAttribute('d', dAttribute);

    let guideLinePoint = svg_.drawCircle(position * curve - Math.PI, position, 0.02 * radius);
    guideLinePoint.setAttribute('class', 'guide-line-point');

    asteroids.appendChild(pathEl);
    asteroids.appendChild(guideLinePoint);
};

svg_.drawShip = function (asteroids, position, radius, options = {}) {
    //defaults:
    let lineWidth = options.lineWidth || 0.5;
    let stroke = options.stroke || 'white';
    let fill = options.fill || 'black';
    let angle = (options.angle || 0.5 * Math.PI) / 2;
    let curve = options.curve || 0.5;
    let guide = options.guide;

    svg_.drawShipPaths(asteroids, position, radius, angle, curve, guide, lineWidth, stroke, fill);
    if (guide) {
        let guideCircle = svg_.drawCircle(position, position, radius, curve);
        guideCircle.setAttribute('class', 'guide-circle');
        asteroids.appendChild(guideCircle);
    }
};

svg_.rotateElement = function (asteroids, element, position, x, y, rotateValue) {
    let clonedElement = element.cloneNode(true);
    clonedElement.setAttribute('transform', `translate(${x}, ${y}) rotate(${rotateValue}, ${position}, ${position})`);
    asteroids.appendChild(clonedElement);
};

export default svg_;
