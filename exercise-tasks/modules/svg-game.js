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

svg_private.buildShipCoordinatesObject = function (position, radius, angle, curve1, curve2) {
    return {
        startingPoint: {posX: position + radius, posY: position},
        waypoints: [
            {
                controlPointX: Math.cos(angle) * radius * curve2 + position,
                controlPointY: Math.sin(angle) * radius * curve2 + position,
                posX: position + Math.cos(Math.PI - angle) * radius,
                posY: position + Math.sin(Math.PI - angle) * radius,
                guidelineX: position + Math.cos(angle) * radius,
                guidelineY: position + Math.sin(angle) * radius
            },
            {
                controlPointX: -radius * curve1 + position,
                controlPointY: position,
                posX: position + Math.cos(Math.PI + angle) * radius,
                posY: position + Math.sin(Math.PI + angle) * radius,
                guidelineX: position - radius,
                guidelineY: position
            },
            {
                controlPointX: Math.cos(-angle) * radius * curve2 + position,
                controlPointY: Math.sin(-angle) * radius * curve2 + position,
                posX: position + radius,
                posY: position,
                guidelineX: position + Math.cos(angle) * radius,
                guidelineY: position - Math.sin(angle) * radius
            }
        ]
    };
};

svg_private.buildAsteroidCoordinatesString = function (x, y, radius, segments, noise) {
    let coordinates = 'M';
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * 2 * Math.PI;
        const x1 = radius * Math.cos(angle) * ((Math.random() + 0.6) * noise) + radius;
        const y1 = radius * Math.sin(angle) * ((Math.random() + 0.6) * noise) + radius;
        coordinates += `${x1}, ${y1} `;
    }
    coordinates += 'Z';
    return coordinates;
};

svg_private.buildDAttributeForShip = function (position, coordinates, guide, radius) {
    let dAttribute = `M ${coordinates.startingPoint.posX} ${coordinates.startingPoint.posY}`;
    coordinates.waypoints.forEach((waypoint) => {
        let {controlPointX, controlPointY, posX, posY} = waypoint;
        dAttribute += `Q ${controlPointX} ${controlPointY} ${posX} ${posY}`;
    });
    if (guide) {
        const pointRadius = 0.02 * radius;
        coordinates.waypoints.forEach((waypoint) => {
            let {guidelineX, guidelineY, controlPointX, controlPointY} = waypoint;
            if (waypoint.guidelineX) {
                dAttribute += `M ${position} ${position} L ${guidelineX} ${guidelineY} M ${controlPointX - pointRadius} ${controlPointY} a ${pointRadius} ${pointRadius} 0 1 0 ${pointRadius * 2} 0 a ${pointRadius} ${pointRadius} 0 1 0 ${-pointRadius * 2} 0`;
            }
        });
    }
    return dAttribute;
};

svg_private.setBasicAttributes = function (elementType, className, fill, stroke, strokeWidth) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
    element.setAttribute('class', className);
    element.setAttribute('fill', fill);
    element.setAttribute('stroke', stroke);
    element.setAttribute('stroke-width', strokeWidth);
    return element;
};

svg_private.drawShipPaths = function (asteroids, position, radius, angle, curve1, curve2, guide, strokeWidth, stroke, fill) {
    const coordinates = svg_private.buildShipCoordinatesObject(position, radius, angle, curve1, curve2);
    const dAttribute = svg_private.buildDAttributeForShip(position, coordinates, guide, radius);

    const outputElement = svg_private.setBasicAttributes('path', 'ship', fill, stroke, strokeWidth);

    outputElement.setAttribute('d', dAttribute);
    console.log(outputElement);
    asteroids.appendChild(outputElement);
};
svg_private.crateAsteroidsElement = function (asteroids, x, y, radius, segments, lineWidth, stroke, fill, noise) {
    const dAttribute = svg_private.buildAsteroidCoordinatesString(x, y, radius, segments, noise);
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    pathElement.setAttribute('d', dAttribute);
    pathElement.setAttribute('stroke', stroke);
    pathElement.setAttribute('fill', fill);
    pathElement.setAttribute('stroke-width', lineWidth);

    pathElement.style.transform = `translate(${x - radius}px, ${y - radius}px)`;
    return pathElement;
};

svg_.drawCircle = function (x, y, radius, fill = 'rgba(0, 0, 0, 0.405)', stroke = 'white', strokeWidth = '0.5px') {
    let circleEl = svg_private.setBasicAttributes('circle', 'guide-circle', fill, stroke, strokeWidth);
    circleEl.setAttribute('cx', x);
    circleEl.setAttribute('cy', y);
    circleEl.setAttribute('r', radius);

    return circleEl;
};

svg_.drawShip = function (asteroids, position, radius, options = {}) {
    //defaults:
    let lineWidth = options.lineWidth || 0.5;
    let stroke = options.stroke || 'white';
    let fill = options.fill || 'black';
    let angle = (options.angle || 0.5 * Math.PI) / 2;
    let curve1 = options.curve1 || 0.25;
    let curve2 = options.curve2 || 0.75;
    let guide = options.guide;

    if (guide) {
        let guideCircle = svg_.drawCircle(position, position, radius);
        asteroids.appendChild(guideCircle);
    }
    svg_private.drawShipPaths(asteroids, position, radius, angle, curve1, curve2, guide, lineWidth, stroke, fill);
};

svg_.rotateElement = function (asteroids, element, position, x, y, rotateValue) {
    let clonedElement = element.cloneNode(true);
    clonedElement.setAttribute('transform', `translate(${x}, ${y}) rotate(${rotateValue}, ${position}, ${position})`);
    asteroids.appendChild(clonedElement);
};

svg_.drawAsteroid = function (asteroids, x, y, radius, segments, options = {}) {
    //defaults:
    let lineWidth = options.lineWidth ?? 1.75;
    let stroke = options.stroke ?? 'white';
    let fill = options.fill ?? 'black';
    let guide = options.guide;
    let noise = options.noise ?? 0.75;

    if (guide) {
        let guideCircle = svg_.drawCircle(x, y, radius);
        asteroids.appendChild(guideCircle);
    }

    const asteroidsElement = svg_private.crateAsteroidsElement(asteroids, x, y, radius, segments, lineWidth, stroke, fill, noise);

    asteroids.appendChild(asteroidsElement);
};

export default svg_;
