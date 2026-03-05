let data;
let dataObj;
let poppinsRegular;
let inconsolataRegular;
let topics;
let baskerville;
let RegularBaskerville;
let cambiamento = true;

let activeRay = -1; 
let wasOverBack = false; 
let isClicked = false; 

const COLORS = {
  economic: "#6f66a0", 
  social:   "#6f66a0", 
  freedom:  "#6f66a0", 
  violence: "#6f66a0"  
};

let spicchiText = [
  "Perception that a woman earning_more or the same as her husband_doesn't cause any problems",
  "Perception that men shouldn't have_more right to a job than women",
  "Perception that children don't necessarily_suffer more if a mother works for pay",
  "Perceptions that men don't necessarily make_better business executives than women",
  "Feeling of safety at night",
  "Confidence in the judicial system and courts",
  "Perception that men aren't necessarily_better political leaders than women",
  "Women who didn't undergo child marriage",
  "Women who didn't undergo FGM",
  "Perception that FGM should stop",
  "Perception that a husband is not justified_in hitting or beating his wife under any_circumstances",
  "Bank account ownership",
  "House ownership",
  "Land ownership",
];

let spicchiLink = [
  "../visualisation/parameters.html?slide=4",
  "../visualisation/parameters.html?slide=5",
  "../visualisation/parameters.html?slide=6",
  "../visualisation/parameters.html?slide=7",
  "../visualisation/parameters.html?slide=8",
  "../visualisation/parameters.html?slide=9",
  "../visualisation/parameters.html?slide=10",
  "../visualisation/parameters.html?slide=11",
  "../visualisation/parameters.html?slide=12",
  "../visualisation/parameters.html?slide=13",
  "../visualisation/parameters.html?slide=14",
  "../visualisation/parameters.html?slide=1",
  "../visualisation/parameters.html?slide=2",
  "../visualisation/parameters.html?slide=3",
];

function preload() {
  data = loadTable("../assets/data.csv", "csv", "header");
  inconsolataRegular = loadFont('../fonts/Inconsolata-Regular.ttf');
  baskerville = loadFont('../fonts/LibreBaskervilleItalic.ttf');
  RegularBaskerville = loadFont('../fonts/LibreBaskervilleRegular.ttf');
}

function setup() {
  let container = document.getElementById('sketch-holder');
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('sketch-holder');
  
  window.totalWidth = width;
  window.totalHeight = height;
  
  window.nazioni = {}; 
  for (let r of data["rows"]) {
    let riga = r["obj"];
    let nomeC = riga["Country"];
    if (!(nomeC in nazioni)){
      nazioni[nomeC] = {
        "nome": nomeC,
        "continent": riga["Country"],
        "area": riga["Area"],
        "average": riga["Average"],
      };    
    }
    nazioni[nomeC][riga["Parameter"]] = riga["Value"];
  }
      
  window.size = 4/16 * totalWidth;
  window.xPos = 11/16 * totalWidth; 
  window.yPos = totalHeight / 2;
  
  window.centerX = window.xPos;
  window.centerY = window.yPos;
  window.indiceSpicchio = -1;
}

function mousePressed() {
  if (indiceSpicchio >= 0) {
    isClicked = true;
    cambiamento = true;
  }
}

function mouseReleased() {
  if (isClicked && indiceSpicchio >= 0) {
    window.location.href = spicchiLink[indiceSpicchio];
  }
  isClicked = false;
  cambiamento = true;
}

function draw() {
  let params = getURLParams();
  let country = params['country']; 
  let paese = nazioni[country]; 

  angleMode(RADIANS);
  mouseOverReaction(size);

  if (cambiamento) {
    background("#06011E");  
    
    disegnaCerchi(xPos, yPos, size, paese);
    disegnaScala(xPos, yPos, size); 

    let leftMargin = totalWidth * 0.08; 

    push();
    textAlign(LEFT, TOP);
    textSize(size * 0.15); 
    textFont(inconsolataRegular);
    fill(248, 255, 184);
    let myString = paese["nome"].replace(/_/g, " ");
    text(myString, leftMargin, totalHeight * 0.08); 
    pop();

    push();
    let textYPos = totalHeight * 0.08 + (size * 0.22); 
    textFont(inconsolataRegular);
    textAlign(LEFT, TOP);
    textSize(size * 0.05); 

    if (indiceSpicchio >= 0) {
      cursor("pointer");
      fill("#F8FFB8");
      noStroke();
      let stringhetta = spicchiText[indiceSpicchio].replace(/_/g, '\n');
      text(stringhetta, leftMargin, textYPos);
    } else {
      cursor("default");
      fill(255, 255, 191, 140);
      noStroke();
      let scrittaInizio = "Hover over the rays with your mouse_to view the parameters names._Click on the rays to learn more.".replace(/_/g, '\n');
      text(scrittaInizio, leftMargin, textYPos);
    }
    pop();

    angleMode(RADIANS);
    disegnaSole(xPos, yPos, size, paese);

    let raggioTesto = size * 17 / 26; 
    let arcoGradi = 360/14;
    let offAlpha = 90; 

    let colEco = (indiceSpicchio >= 11 && indiceSpicchio <= 13) ? COLORS.economic : color(111, 102, 160, offAlpha);
    disegnaTestoCurvo(xPos, yPos, raggioTesto, "Economic rights", arcoGradi * 11.4, arcoGradi * 12.7, colEco, false);

    let colVio = (indiceSpicchio >= 7 && indiceSpicchio <= 10) ? COLORS.violence : color(111, 102, 160, offAlpha);
    disegnaTestoCurvo(xPos, yPos, raggioTesto, "General Violence", arcoGradi * 7.7, arcoGradi * 9.2, colVio, false);

    let colSoc = (indiceSpicchio >= 0 && indiceSpicchio <= 3) ? COLORS.social : color(111, 102, 160, offAlpha);
    disegnaTestoCurvo(xPos, yPos, raggioTesto, "Social rights", arcoGradi * 0.85, arcoGradi * 2.15, colSoc, true);

    let colFre = (indiceSpicchio >= 4 && indiceSpicchio <= 6) ? COLORS.freedom : color(111, 102, 160, offAlpha);
    disegnaTestoCurvo(xPos, yPos, raggioTesto, "Freedom and Justice", arcoGradi * 4.25, arcoGradi * 5.85, colFre, true);

    cambiamento = false;
  }
}

function disegnaSole(x, y, size, nazione) {
  push();
  noStroke();
  for (let e = size / 7; e > 0; e -= 2) {
    let alpha = map(e, size / 7, 0, 30, 150); 
    fill(248, 255, 184, alpha);
    ellipse(x, y, e, e);
  }

  drawRay(11, nazione["Bank account ownership"], size);
  drawRay(12, nazione["House ownership"], size);
  drawRay(13, nazione["Land ownership"], size);
  drawRay(0, nazione["Perception that a woman earning more money than her husband doesn't cause any problems"], size);
  drawRay(1, nazione["Perception that men shouldn't have more right to a job than women"], size);
  drawRay(2, nazione["Perception that children sufference isn't a consequence of a mother working for pay"], size);
  drawRay(3, nazione["Perceptions that men don't necessarily make better business executives than women"], size);
  drawRay(4, nazione["Feeling of safety at night"], size);
  drawRay(5, nazione["Confidence in the judicial system and courts"], size);
  drawRay(6, nazione["Perception that men don't necessarily make better political leaders than women"], size);
  drawRay(7, nazione["Percentage of women not in a child marriage"], size);
  drawRay(8, nazione["Non genital-mutilated women percentage"], size);
  drawRay(9, nazione["Perception that female genital mutilation should stop"], size);
  drawRay(10, nazione["Perception that a husband is not justified in hitting or beating his wife under any circumstances"], size);
  pop();
}

function drawRay(index, rayLengthData, size) {
  drawSecondRay(index, rayLengthData, size);

  let rayLength = parseInt(rayLengthData);
  let isNone = false;
  let isHover = (index == window.indiceSpicchio);

  if (isNaN(rayLength) || rayLengthData === "none") {
    rayLength = 100; 
    isNone = true;
  }

  let numRays = 14;
  let angleStep = TWO_PI / numRays;
  let angle = angleStep * index;

  let x1 = centerX + cos(angle) * size / 10;
  let y1 = centerY + sin(angle) * size / 10;

  // Gestione colori e saturazione
  if (isNone) {
    fill(248, 255, 184, isHover ? 45 : 25); 
  } else {
    fill(248, 255, 184, isHover ? 255 : 15); 
  }

  // --- DIFFERENZA SPESSORE ---
  // Raggi con dati: spessore base 9.5 (più largo). 
  // Raggi none: spessore base 0.5 (un filo sottile).
  let spessoreDati = 9.5;
  let spessoreNone = 0.5;
  let maxRadius = (isNone ? spessoreNone : spessoreDati) / 500 * size;

  for (let j = 0; j < rayLength * size / 160; j++) {
    let radius = map(j, 0, rayLength * 17 / 4, 0, maxRadius);
    let distance = j * 2 / 4;
    let x = x1 + cos(angle) * distance;
    let y = y1 + sin(angle) * distance;
    noStroke();
    ellipse(x, y, radius * 2, radius * 2);
  }

  // Testi con massima saturazione come richiesto
  let fontSize = 1.1 / 36 * size;
  fill(255, 255, 191, 255); 
  textAlign(CENTER, CENTER);
  textFont(RegularBaskerville);
  textSize(fontSize);
  
  let distanziamentoNumeri = size / 2.4; 
  let maxx = x1 + cos(angle) * distanziamentoNumeri;
  let maxy = y1 + sin(angle) * distanziamentoNumeri;

  if (isNone) {
    text("none", maxx, maxy);
  } else {
    text(rayLengthData + "%", maxx, maxy);
  }
}

function drawSecondRay(index, rayLengthData, size) {
  drawTRay(index, rayLengthData, size);
  let rayLength = parseInt(rayLengthData);
  let isHover = (index == window.indiceSpicchio);
  let isNone = (isNaN(rayLength) || rayLengthData === "none");
  
  let alphaVal = isHover ? (isNone ? 25 : 60) : (isNone ? 5 : 4);
  fill(255, 255, 191, alphaVal); 

  if (isNone) rayLength = 100;
  let angle = (TWO_PI / 14) * index;
  let x1 = centerX + cos(angle) * size / 10;
  let y1 = centerY + sin(angle) * size / 10;
  
  // Anche il bagliore segue la sottigliezza del raggio
  let maxRadSecond = (isNone ? 1.5 : 12.5) / 500 * size;

  for (let j = 0; j < rayLength * size / 155; j++) {
    let radius = map(j, 0, rayLength * 17 / 4, 1/500*size, maxRadSecond);
    let distance = j * 2 / 4;
    ellipse(x1 + cos(angle) * distance, y1 + sin(angle) * distance, radius * 2, radius * 2);
  }
}

function drawTRay(index, rayLengthData, size) {
  let rayLength = parseInt(rayLengthData);
  let isHover = (index == window.indiceSpicchio);
  let isNone = (isNaN(rayLength) || rayLengthData === "none");
  
  let alphaVal = isHover ? (isNone ? 15 : 30) : (isNone ? 2 : 2);
  fill(255, 255, 191, alphaVal); 

  if (isNone) rayLength = 100;
  let angle = (TWO_PI / 14) * index;
  let x1 = centerX + cos(angle) * size / 10;
  let y1 = centerY + sin(angle) * size / 10;
  
  let maxRadT = (isNone ? 2.5 : 16.5) / 500 * size;
  
  for (let j = 0; j < rayLength * size / 150; j++) {
    let radius = map(j, 0, rayLength * 17 / 4, 2/500*size, maxRadT);
    let distance = j * 2 / 4;
    ellipse(x1 + cos(angle) * distance, y1 + sin(angle) * distance, radius * 2, radius * 2);
  }
}

function disegnaCerchi(x, y, size, paese){
  push();
  angleMode(DEGREES);
  noFill();
  strokeWeight(1.5);
  stroke(214, 214, 156, 140);
  drawingContext.setLineDash([0.5, 10.5]);
  ellipse(x, y, size*22/26, size*22/26);
  stroke(214, 214, 156, 110);
  ellipse(x, y, size*14/26, size*14/26);
  drawingContext.setLineDash([0, 0]);

  let nuovaSize = 30.5/26 * size; 
  let arco = 360/14;
  let onAlpha = "B4"; 
  let offAlpha = "50"; 
  strokeWeight(2.5); 

  let alphaEco = (indiceSpicchio >= 11 && indiceSpicchio <= 13) ? onAlpha : offAlpha;
  stroke(color(COLORS.economic + alphaEco)); 
  arc(x, y, nuovaSize, nuovaSize, arco*10.9, arco*13.2);

  let alphaSoc = (indiceSpicchio >= 0 && indiceSpicchio <= 3) ? onAlpha : offAlpha;
  stroke(color(COLORS.social + alphaSoc)); 
  arc(x, y, nuovaSize, nuovaSize, arco*13.9, arco*3.2);

  let alphaFre = (indiceSpicchio >= 4 && indiceSpicchio <= 6) ? onAlpha : offAlpha;
  stroke(color(COLORS.freedom + alphaFre)); 
  arc(x, y, nuovaSize, nuovaSize, arco*3.9, arco*6.2);

  let alphaVio = (indiceSpicchio >= 7 && indiceSpicchio <= 10) ? onAlpha : offAlpha;
  stroke(color(COLORS.violence + alphaVio)); 
  arc(x, y, nuovaSize, nuovaSize, arco*6.9, arco*10.2);
  
  pop();
}

function disegnaScala(x, y, size) {
  push();
  let r50 = (size * 14 / 26) / 2;  
  let r100 = (size * 22 / 26) / 2; 
  let rMax = (size * 29 / 26) / 2; 
  textFont(inconsolataRegular);
  textSize(size * 0.04); 
  textAlign(RIGHT, CENTER);
  stroke(214, 214, 156, 160);
  strokeWeight(1.5);
  drawingContext.setLineDash([2, 4]);
  let yBase = y + (size * 0.12); 
  let offset = size * 0.04; 
  let y50 = yBase - offset;
  let lineLen50 = size * 0.30; 
  line(x - r50, y50, x - rMax - lineLen50, y50);
  noStroke();
  fill(214, 214, 156, 240); 
  text("50%", x - rMax - lineLen50 - 10, y50);
  stroke(214, 214, 156, 160);
  drawingContext.setLineDash([2, 4]);
  let y100 = yBase + offset;
  let lineLen100 = size * 0.55; 
  line(x - r100, y100, x - rMax - lineLen100, y100);
  noStroke();
  fill(214, 214, 156, 240);
  text("100%", x - rMax - lineLen100 - 10, y100);
  pop();
}

function disegnaTestoCurvo(x, y, r, testo, angInizio, angFine, col, inverti) {
  push();
  angleMode(DEGREES);
  textSize(size * 0.042); 
  textAlign(CENTER, CENTER);
  textFont(inconsolataRegular);
  fill(col);
  noStroke();
  let numLettere = testo.length;
  let angoloTotale = angFine - angInizio;
  let angoloStep = angoloTotale / (numLettere - 1);
  for (let i = 0; i < numLettere; i++) {
    let charIndex = inverti ? (numLettere - 1 - i) : i;
    let angolo = angInizio + angoloStep * i;
    let tx = x + r * cos(angolo);
    let ty = y + r * sin(angolo);
    push();
    translate(tx, ty);
    rotate(angolo + (inverti ? 270 : 90));
    text(testo.charAt(charIndex), 0, 0);
    pop();
  }
  pop();
}

function mouseOverReaction(size) {
  angleMode(RADIANS);
  let nuovoValoreIndiceSpicchio = -1;
  let distanza = dist(mouseX, mouseY, centerX, centerY);
  if (distanza < size/2) {
    let angolo = atan2(mouseY - centerY, mouseX - centerX);
    let angoloGradi = degrees(angolo);
    if (angoloGradi < 0) angoloGradi += 360;
    angoloGradi = (angoloGradi + 360/28) % 360;
    nuovoValoreIndiceSpicchio = floor(map(angoloGradi, 0, 360, 0, 14)) % 14;
  } 
  if(nuovoValoreIndiceSpicchio != window.indiceSpicchio) {
    window.indiceSpicchio = nuovoValoreIndiceSpicchio;
    cambiamento = true;
  }
}