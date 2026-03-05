let data;
let nazioni = {};
let backgroundColor = '#06011e';
let minAverage = Infinity;
let maxAverage = -Infinity;
let inconsolataRegular;

function preload() {
    data = loadTable("../assets/data.csv", "csv", "header");
    inconsolataRegular = loadFont('../fonts/Inconsolata-Regular.ttf');
}

function setup() {
    // Dimensionamento dinamico basato sul contenitore HTML
    let container = document.getElementById('sketch-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('sketch-container');

    for (let r = 0; r < data.getRowCount(); r++) {
        let riga = data.rows[r].obj;
        let nomeOriginale = riga["Country"];
        let nomePulito = nomeOriginale.replace(/_/g, ' ');
        let avg = parseFloat(riga["Average"]);

        if (!(nomeOriginale in nazioni)) {
            nazioni[nomeOriginale] = {
                "id": nomeOriginale,
                "nomeDisplay": nomePulito,
                "continent": riga["Continent"],
                "lon": parseFloat(riga["Longitude"]),
                "lat": parseFloat(riga["Latitude"]),
                "average": avg
            };
            if (avg < minAverage) minAverage = avg;
            if (avg > maxAverage) maxAverage = avg;
        }
    }
}

function draw() {
    background(backgroundColor);

    let hoverID = null;

    for (let id in nazioni) {
        let p = nazioni[id];
        // Mappatura coordinate
        let x = map(p.lon, -100, 110, 0, width);
        let y = map(p.lat, -30, 75, height, 0);

        let pulse = sin(frameCount * 0.03) * 1.2; 
        let sizeBase = width * 0.1;
        let diameter = map(p.average, minAverage, maxAverage, sizeBase * 0.06, sizeBase * 0.13) + pulse;

        let d = dist(mouseX, mouseY, x, y);
        let isHover = d < diameter / 2 + 10;

        if (isHover) {
            hoverID = id;
            cursor(HAND);
            drawHalo(x, y, p.average, diameter * 1.5);
            drawGliph(x, y, color(253, 255, 170), diameter + 3);
        } else {
            drawHalo(x, y, p.average, diameter);
            let opacity = map(p.average, minAverage, maxAverage, 80, 255);
            drawGliph(x, y, color(253, 255, 170, opacity), diameter);
        }
    }

    if (!hoverID) cursor(ARROW);
    if (hoverID) {
        drawLabel(mouseX, mouseY, nazioni[hoverID].nomeDisplay);
    }
}

function mousePressed() {
    for (let id in nazioni) {
        let p = nazioni[id];
        let x = map(p.lon, -100, 110, 0, width);
        let y = map(p.lat, -30, 75, height, 0);
        let sizeBase = width * 0.1;
        let diameter = map(p.average, minAverage, maxAverage, sizeBase * 0.06, sizeBase * 0.13);

        if (dist(mouseX, mouseY, x, y) < diameter / 2 + 15) {
            window.location.href = `../sun/sun.html?country=${encodeURIComponent(p.id)}`;
        }
    }
}

function drawHalo(x, y, myValue, diameter) {
    let maxHaloSize = map(myValue, 0, 10, diameter * 0.2, diameter * 0.8);
    for (let i = 0; i < 4; i++) {
        let currentSize = maxHaloSize * (i + 1) * 0.25;
        let currentOpacity = map(i, 0, 4, 30, 5);
        fill(253, 255, 140, currentOpacity);
        noStroke();
        ellipse(x, y, currentSize);
    }
}

function drawGliph(x, y, c, diameter) {
    fill(c);
    noStroke();
    ellipse(x, y, diameter);
}

function drawLabel(x, y, nome) {
    push();
    fill(248, 255, 184);
    if (inconsolataRegular) {
        textFont(inconsolataRegular);
    } else {
        textFont('monospace');
    }
    textSize(15); 
    textAlign(LEFT, CENTER);
    text(nome, x + 15, y); 
    pop();
}

function windowResized() {
    let container = document.getElementById('sketch-container');
    resizeCanvas(container.offsetWidth, container.offsetHeight);
}