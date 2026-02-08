let data;
let dataObj;
let poppinsRegular;
let inconsolataRegular;
let baskerville;
let RegularBaskerville;
let cambiamento = true;

let activeRay = -1;  // Nessun raggio attivo inizialmente

//testi che ritroviamo a sinistra quando si fa il mouseover

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

//collegamento alle slide con le spiegazioni dei paramentri

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
 // poppinsRegular = loadFont('assets/Poppins-Regular.ttf');
  inconsolataRegular = loadFont('../fonts/Inconsolata-Regular.ttf');
  baskerville = loadFont ('../fonts/LibreBaskervilleItalic.ttf');
  RegularBaskerville = loadFont ('../fonts/LibreBaskervilleRegular.ttf');
  legendaUno = loadImage("../assets/legendaSoleDefinitiva.png");
}

function setup() {
  //noLoop();
  window.totalWidth = windowWidth * 0.950;
  window.totalHeight = windowHeight * 0.950;
  createCanvas(totalWidth, totalHeight);
  
    //sistemo il dataset per avere a diposizione i dati per ciascun Paese
    window.nazioni = {} 
    console.log(data);
    for (let r of data["rows"]) {
      let riga = r["obj"];
  
      let nomeC = riga ["Country"];
  
      if (!(nomeC in nazioni)){
        nazioni[nomeC] = {
          "nome" : nomeC,
          "continent" : riga ["Country"],
          "area" : riga ["Area"],
          "average" : riga ["Average"],
        };    
      }
      nazioni[nomeC][riga["Parameter"]] = riga ["Value"];
    }
  
    console.log(nazioni);
     
    window.size = 5/16*totalWidth;
    window.xPos = 11/16*totalWidth;
    window.yPos = totalHeight/2;
    
    window.centerX = 11/16*totalWidth;
    window.centerY = totalHeight/2;

    window.indiceSpicchio = -1;
   
}

//funzione che mi permette di andare alle spiegazioni più approfondite dei parametri
function mouseClicked() {
  
  if(indiceSpicchio >= 0) {
    window.location.href = spicchiLink[indiceSpicchio];
  }

}

function draw() {

  
  ////////////////// RECUPERO DATI ////////////////////
  // Recupera i parametri dall'URL
  let params = getURLParams();
  let country = params['country']; 
  
  // Seleziona il primo paese nel dataset
  let paese = nazioni[country];  // Prendi il primo paese nel dataset

  angleMode(RADIANS);
   mouseOverReaction(size);

 
   

   ///////////////// DISEGNO ///////////////////

   if (cambiamento){
    
    background("#06011E");  
    angleMode(RADIANS);
    disegnaCerchi(xPos, yPos, size, paese);
    angleMode(RADIANS);

    if(indiceSpicchio >= 0){
      cursor("pointer");
      // Mostriamo la scritta corrispondente
    fill("#F8FFB8");
    noStroke();
    textFont(RegularBaskerville);
    textSize (size *0.04)
    textAlign(LEFT, TOP);
    let stringhetta = spicchiText[indiceSpicchio].replace(/_/g, '\n');
    text(stringhetta, xPos - 12.8/16*xPos, (totalHeight/2 - 8/50*size));
    }
    else {
      fill(255, 255, 191, 70);
      noStroke();
      textFont(RegularBaskerville);
      textSize (size *0.04)
      textAlign(LEFT, TOP);
      let scrittaInizio = "Hover over the rays with your mouse_to view the parameters names._Click on the rays to learn more.".replace(/_/g, '\n');
      text(scrittaInizio, xPos - 12.8/16*xPos, (totalHeight/2 - 8/50*size));
      cursor("default");
    }
  
    
    // Passa il paese alla funzione disegnaSole
   disegnaSole(xPos, yPos, size, paese);
   
   //disegnaSole (xPos,yPos, size, nazioni[nomeC]);
 
   ilGrandeNome (xPos, totalHeight, size, paese, baskerville);

   
   let scaleFactor = 0.00155*size;
   let scaledWidth = legendaUno.width * scaleFactor;
   let scaledHeight = legendaUno.height * scaleFactor;
   image(legendaUno, xPos-12.8/16*xPos, windowHeight - 21.6/16*legendaUno.height, scaledWidth, scaledHeight);
 
   // ----------------------- testi curvi ---------------------------------
   testoCurvoEconomic (xPos, yPos, size);
   testoCurvoSocial (xPos, yPos, size);
   testoCurvoFree (xPos, yPos, size);
   testoCurvoViolence (xPos, yPos, size);
   //--------------------------------------------------------------------- 
   cambiamento = false
  }
   

}


//funzione per far funzionare il mouseover
function mouseOverReaction(size) {
  let nuovoValoreIndiceSpicchio = -1;

  let distanza = dist(mouseX, mouseY, centerX, centerY);
  console.log(size, distanza)

  // Se il mouse è dentro il cerchio
  if (distanza < size/2) {
    // Calcoliamo l'angolo in radianti
    let angolo = atan2(mouseY - centerY, mouseX - centerX);
    
    // Convertiamo l'angolo da radianti a gradi
    let angoloGradi = degrees(angolo);
    
    // Normalizziamo l'angolo per farlo variare tra 0 e 360
    if (angoloGradi < 0) {
      angoloGradi += 360;
    }
    
    // Aggiungiamo l'offset all'angolo e mappiamo l'angolo in gradi a uno degli spicchi (14 spicchi)
    angoloGradi = (angoloGradi + 360/28) % 360;  // Ruotiamo gli spicchi
    nuovoValoreIndiceSpicchio = floor(map(angoloGradi, 0, 360, 0, 14)) % 14;

  } 

  //imposta il valore se appena sopra è cambiato
  if(nuovoValoreIndiceSpicchio != window.indiceSpicchio) {
    window.indiceSpicchio = nuovoValoreIndiceSpicchio;
    cambiamento = true;
  }
  
}

//funzione che disegna il pallino centrale e imposta i raggi
function disegnaSole (x, y, size, nazione){
  
  noStroke();
  fill("#F8FFB8");
  //ellipse(x, y, size/7, size/7);

   for (let e = size/7; e > 0; e -= 2) {
    let alpha = map(e, size, 0,100, 70); // Gradiente di trasparenza
    fill(248, 255, 184, alpha); // Colore giallo con opacità variabile
    ellipse(x, y, e, e); // Cerchi concentrici
  }

  // Disegnare ogni raggio separatamente
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

}

//funzione che disegna i raggi base (quindi non gli aloni) e scrive le percentuali
function drawRay(index, rayLengthData, size) {

  drawSecondRay(index, rayLengthData, size);
  
  noStroke();
  fill(255, 255, 191, 100)
  //fill(248, 255, 184)
  let rayLength = parseInt(rayLengthData);
  if(isNaN(rayLength)) {
    
    rayLength = 100;
     // Crea il colore #F8FFB8 con trasparenza (ad esempio alpha = 128)
  let c = color(248, 255, 184, 2); // RGB (248, 255, 184) con alpha 128
  
  fill(c); // Applica il colore con trasparenza
  
    
    
  }
   
  let numRays = 14; 
  let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
  
  let angle = angleStep * index; // Calcola l'angolo per il raggio corrente

  // Posizione iniziale dei cerchi (i raggi partono da una distanza maggiore dal centro)
  let x1 = centerX + cos(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  let y1 = centerY + sin(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  
  let minRadius = 0/500*size;  // Raggio minimo per il primo cerchio
  let maxRadius = 8/500*size;  // Raggio massimo per l'ultimo cerchio
  
  
  // Ciclo per disegnare i cerchi lungo il raggio
  for (let j = 0; j < rayLength * size/160; j++) {
    //let radius = map(j, 0, rayLength, minRadius, maxRadius); // Raggio che cresce lungo il raggio
    let radius = map(j, 0, rayLength * 17 / 4, minRadius, maxRadius);
    let distance = j * 2 / 4; // La distanza tra i cerchi lungo il raggio

    // Calcola la posizione di ogni cerchio lungo il raggio
    let x = x1 + cos(angle) * distance;
    let y = y1 + sin(angle) * distance;
    
    ellipse(x, y, radius * 2, radius * 2); // Disegna il cerchio
  }
  
  let fontSize = 1/36 *size
  fill(255, 255, 191, 70)
  textAlign(CENTER,CENTER);
  textFont (RegularBaskerville);
  textSize (fontSize)
  let maxx =  x1 + cos(angle) * size/2.55;
  let maxy =  y1 + sin(angle) * size/2.55;

  if (rayLengthData !== null && rayLengthData !== "none") {
    text(rayLengthData + "%", maxx, maxy);
  } else {
    text(rayLengthData, maxx, maxy); // Disegna solo il numero senza il simbolo %
  }

  //text(rayLengthData+"%", maxx, maxy);
}

//funzione per i raggi alone (1)
function drawSecondRay(index, rayLengthData, size) {
  drawTRay(index, rayLengthData, size);

  noStroke();
  fill(255, 255, 191, 4)
  //fill(248, 255, 184)
  let rayLength = parseInt(rayLengthData);
  if(isNaN(rayLength)) {
    
    rayLength = 100;
     
  let c = color(248, 255, 184 ,0); // RGB (248, 255, 184) con alpha 128
  
  fill(c); // Applica il colore con trasparenza
  
    
    
  } 
  let numRays = 14; 
  let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
  
  let angle = angleStep * index; // Calcola l'angolo per il raggio corrente

  // Posizione iniziale dei cerchi (i raggi partono da una distanza maggiore dal centro)
  let x1 = centerX + cos(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  let y1 = centerY + sin(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  
  let minRadius = 2/500*size;  // Raggio minimo per il primo cerchio
  let maxRadius = 14/500*size;  // Raggio massimo per l'ultimo cerchio
  
  
  // Ciclo per disegnare i cerchi lungo il raggio
  for (let j = 0; j < rayLength * size/155; j++) {
    //let radius = map(j, 0, rayLength, minRadius, maxRadius); // Raggio che cresce lungo il raggio
    let radius = map(j, 0, rayLength * 17 / 4, minRadius, maxRadius);
    let distance = j * 2 / 4; // La distanza tra i cerchi lungo il raggio

    // Calcola la posizione di ogni cerchio lungo il raggio
    let x = x1 + cos(angle) * distance;
    let y = y1 + sin(angle) * distance;
    
    ellipse(x, y, radius * 2, radius * 2); // Disegna il cerchio
  }
}

//funzione per i raggi alone (2)
function drawTRay(index, rayLengthData, size) {
  noStroke();
  fill(255, 255, 191, 0.6)
  if(index == indiceSpicchio) {
    fill(200, 200, 200, 4);
  }
  //fill(248, 255, 184)
  let rayLength = parseInt(rayLengthData);
  if(isNaN(rayLength)) {
    
    rayLength = 100;
     // Crea il colore #F8FFB8 con trasparenza
  let c = color(248, 255, 184 ,0); 
 
  fill(c); // Applica il colore con trasparenza
  
    
    
  }
   
  let numRays = 14; 
  let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
  
  let angle = angleStep * index; // Calcola l'angolo per il raggio corrente

  // Posizione iniziale dei cerchi (i raggi partono da una distanza maggiore dal centro)
  let x1 = centerX + cos(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  let y1 = centerY + sin(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  
  let minRadius = 3/500*size;  // Raggio minimo per il primo cerchio
  let maxRadius = 20/500*size;  // Raggio massimo per l'ultimo cerchio
  
  
  // Ciclo per disegnare i cerchi lungo il raggio
  for (let j = 0; j < rayLength * size/150; j++) {
    //let radius = map(j, 0, rayLength, minRadius, maxRadius); // Raggio che cresce lungo il raggio
    let radius = map(j, 0, rayLength * 17 / 4, minRadius, maxRadius);
    let distance = j * 2 / 4; // La distanza tra i cerchi lungo il raggio

    // Calcola la posizione di ogni cerchio lungo il raggio
    let x = x1 + cos(angle) * distance;
    let y = y1 + sin(angle) * distance;
    
    ellipse(x, y, radius * 2, radius * 2); // Disegna il cerchio
  }
}

function mouseMoved() {
  let mouseDist = dist(mouseX, mouseY, centerX, centerY);
  if (mouseDist < size / 2) {  // Controlla se il mouse è dentro il cerchio
    let numRays = 14;
    let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
    let angle = atan2(mouseY - centerY, mouseX - centerX); // Calcola l'angolo rispetto al centro

    // Trova il raggio corrispondente all'angolo
    activeRay = floor((angle + PI) / angleStep); // Calcola quale spicchio è attivo
    if (activeRay < 0) activeRay = numRays - 1; // Correggi l'angolo negativo
  } else {
    activeRay = -1;  // Nessun raggio attivo se il mouse è fuori dal cerchio
  }
}

//funzione per i cerchi del 50% e 100%
function disegnaCerchi(x, y, size, paese){
  noFill();
  strokeWeight (2);
  stroke(214, 214, 156, 90);
  drawingContext.setLineDash([0.5, 10.5]);
  ellipse(x, y, size*22/26, size*22/26);
  stroke(214, 214, 156, 70);
  ellipse(x, y, size*14/26, size*14/26);

  let arco = 360/14
  
  drawingContext.setLineDash([0, 0]);
  angleMode(DEGREES)
  let nuovaSize = 29/26* size
  stroke("#B1803C75");
  arc(x, y, nuovaSize, nuovaSize, arco*10.9, arco*13.2);
  stroke("#B7626375");
  arc(x, y, nuovaSize, nuovaSize, arco*13.9, arco*3.2);
  stroke("#87538F75");
  arc(x, y, nuovaSize, nuovaSize, arco*3.9, arco*6.2);
  stroke("#6969B775");
  arc(x, y, nuovaSize, nuovaSize, arco*6.9, arco*10.2);

  
}


///////////Testi curvi///////////////// (fino a riga 655)
function testoCurvoEconomic (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*11.4; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*12.7;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 16 / 26; // raggio della curva
  let testo = "Economic rights";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#c4802075"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  

  
  
}

function testoCurvoSocial (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*0.85; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*2.15;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 16 / 26; // raggio della curva
  let testo = "Social rights";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#B7626375"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  

  
  
}

function testoCurvoFree (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*4.25; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*5.85;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 16 / 26; // raggio della curva
  let testo = "Freedom and Justice";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#87538F75"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  

  
  
}

function testoCurvoViolence (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*7.7; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*9.2;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 16 / 26; // raggio della curva
  let testo = "General Violence";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#6969B775"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  
  
}


//funzione per il nome del paese
function ilGrandeNome (x, totalHeight, size, nome, font){
  
  textAlign(LEFT, TOP);
  textSize (size *0.1)
  textFont (font);
  fill(248, 255, 184);
  // Sostituire i simboli "_" con uno spazio vuoto nella stringa "nome['nome']"
  let myString = nome["nome"].replace(/_/g, " ");
  
  // Disegnare il testo sostituito
  text(myString, x - 12.8/16 * x, (totalHeight / 2) - (8 / 16 * size));
  
  // Stampare il risultato per il debug
  print(myString);  // Output: "United States of America"
}

function findCountryData(countryName) {
    for (let r of data.rows) {
      let riga = r.obj;
      if (riga["Country"] === countryName) {
        console.log("Data found for", countryName);
        return riga;
      }
    }
    console.log("Data not found for", countryName);  // Aggiungi un log per verificare
    return null; // Se il paese non viene trovato
}

