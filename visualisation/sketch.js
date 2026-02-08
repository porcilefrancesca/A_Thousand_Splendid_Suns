let data;
let baskerville;
let nazioni = {};
let backgroundColor = '#06011e';
// let hoveredGliph = null; // Variabile per tracciare il glifo sotto il mouse

function preload(){
  data = loadTable("../assets/data.csv", "csv", "header");
  legenda = loadImage("../assets/LegendaGenerale.png");
  baskerville = loadFont ('../fonts/LibreBaskervilleRegular.ttf');
}

function setup() {
  let totalWidth = windowWidth;
  let totalHeight = windowHeight*0.70;;
  createCanvas(totalWidth, totalHeight);
  // noLoop();
}

function draw() {
  background(backgroundColor);
  
  let minAverage = Infinity;
  let maxAverage = -Infinity;
  
  // Prepariamo i dati
  for (let r of data.rows) {
    let riga = r.obj;
    let nomeC = riga["Country"];
    
    // Troviamo il valore minimo e massimo della media
    let avg = parseFloat(riga["Average"]);
    minAverage = min(minAverage, avg);
    maxAverage = max(maxAverage, avg);
    
    if (!(nomeC in nazioni)) {
      nazioni[nomeC] = {
        "nome": nomeC,
        "continent": riga["Continent"],
        "lon": riga["Longitude"],
        "lat": riga["Latitude"],
        "average": avg
      };
    }
    nazioni[nomeC][riga["Parameter"]] = riga["Value"];
  }

  // Ciclo attraverso i paesi e disegno le sfere
  for (let paese in nazioni) {
    let paeseData = nazioni[paese];
    let lat = paeseData.lat;
    let lon = paeseData.lon;
    let myValue = paeseData.average;
    
    // Mappiamo le coordinate per il canvas
    let x = map(lon, -94, 100, 0, width);
    let y = map(lat, -23, 68, height, 0);
    
    // Mappa il valore della media al diametro tra 10 e 20
    let size = windowWidth * 0.1;
    let diameter = map(myValue, minAverage, maxAverage, size * 0.06, size * 0.13);

    // Verifica se il mouse è sopra il glifo
    // let distToGliph = dist(mouseX, mouseY, x, y);
    // let isHovered = distToGliph < diameter / 2;

    // Se il mouse è sopra, incrementiamo la dimensione e luminosità
    // if (isHovered) {
    //   hoveredGliph = paese; // Memorizziamo il paese attualmente sotto il mouse
    //   diameter *= 1.25; // Aumenta la dimensione
    //   let opacity = 255; // Luminosità massima
    //   let c = color(253, 255, 170, opacity); // Colore luminoso
    //   drawHalo(x, y, myValue, diameter, true);
    //   drawGliph(x, y, c, diameter);
    // } else {
    //   // Altrimenti, disegna il glifo normalmente
    //   let opacity = map(myValue, minAverage, maxAverage, 45, 255);
    //   let c = color(253, 255, 170, opacity);
    //   drawHalo(x, y, myValue, diameter);
    //   drawGliph(x, y, c, diameter);
    // }

    // //glifo normale senza ingrandimento con hover
    let opacity = map(myValue, minAverage, maxAverage, 45, 255);
    let c = color(253, 255, 170, opacity);
    drawHalo(x, y, myValue, diameter);
    drawGliph(x, y, c, diameter);

    let x1 = size;
    let y1 = 0;
    let scaleFactor = 0.00169*size;
    let scaledWidth = legenda.width * scaleFactor;
    let scaledHeight = legenda.height * scaleFactor;
    image(legenda, x1 * 7.45, y1, scaledWidth, scaledHeight);
    
    let link = createA(`../sun/sun.html?country=${encodeURIComponent(paese)}`, paese);    
    // Posiziona il link sovrapposto il glifo
    let linkYPosition = y + 100; // Posiziona il link sopra il centro del glifo
    let linkXPosition = x - 5; // Centra il link orizzontalmente
    
    // Posiziona il link esattamente sopra il glifo
    link.position(linkXPosition - diameter / 2, linkYPosition - diameter / 2); 
    link.size(diameter*1.5, diameter*1.8); // Il link ha la stessa dimensione del glifo

    // Aggiungi uno stile visibile per il link (opzionale)
    link.style('color', 'transparent');
    link.style('font-size', '0px');
    link.style('text-decoration', 'none');
    // link.style('background', 'rgba(211, 39, 39, 0.5)'); // Aggiunge un fondo scuro al link
    
    // Quando clicchi sul glifo, il link dovrebbe essere aperto
    link.mousePressed(() => {
      window.location.href = link.attribute('href'); // Vai al link quando cliccato
    });
  }
}

function drawHalo(x, y, myValue, diameter) {
  let maxHaloSize = map(myValue, 0, 10, diameter * 0.1, diameter * 0.6); // Mappa la grandezza dell'alone in base al valore "average"
  for (let i = 0; i < 4; i++) {
    let currentSize = maxHaloSize * (i + 1) * 0.18; // Aumenta la dimensione progressivamente
    let currentOpacity = map(i, 0, 4, 50, 10); // Decrescita dell'opacità
    let halo = color(253, 255, 140, currentOpacity);
    fill(halo);
    noStroke();
    ellipse(x, y, currentSize);
  }
}

function drawGliph(x, y, c, diameter){
  fill(c);
  noStroke();
  ellipse(x, y, diameter); // Usa il diametro mappato per il pallino
}


