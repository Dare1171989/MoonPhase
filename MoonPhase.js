let craters = [];
let numCraters;
let moonX;
let planetRadius = 100; 
let moonRadius = planetRadius * 4; 
let duration = 7.3 * 60; 
let numStars = 300; 
let stars = [];


function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < numStars; i++) {  
    let x = random(width);
    let y = random(height);
    let size = random(2, 10);
    stars.push({ x, y, size }); 
  }
  numCraters = int(random(5, 15));

  let centerX = width / 2;
  let centerY = height / 2;

  for (let i = 0; i < numCraters; i++) {
    let angle = random(TWO_PI);
    let radius = random(0, planetRadius);
    let edgeFactor = random(0.7, 1);
    radius *= edgeFactor;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    let craterSize = random(10, 30);
    
    
    let craterShape = generateCraterShape(x, y, craterSize);
    
    craters.push({ shape: craterShape });
  }

  moonX = width + moonRadius; 
  
  
  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    stars.push({ x: x, y: y, size: random(2, 10) });
  }
}

function draw() {
  background(0);

  let centerX = width / 2;
  let centerY = height / 2;

  
  fill(255); 
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    stars[i].opacity = random(100, 255);
    ellipse(stars[i].x, stars[i].y, stars[i].size, stars[i].size); 
    
  }

 
  fill(240, 234, 214);
  noStroke();
  ellipse(centerX, centerY, planetRadius * 2, planetRadius * 2);


  fill(180, 160, 140);
  for (let crater of craters) {
    drawStoredCrater(crater.shape);
  }

 
  moonX = map(frameCount % duration, 0, duration, width + moonRadius, -moonRadius);

  fill(0);
  ellipse(moonX, centerY, moonRadius * 2, moonRadius * 2);
}


function generateCraterShape(x, y, size) {
  let shape = [];
  let numVertices = int(random(6, 12));
  let angleOffset = random(TWO_PI);
  
  for (let i = 0; i < numVertices; i++) {
    let angle = map(i, 0, numVertices, 0, TWO_PI) + angleOffset;
    let distance = size / 2 + random(-size * 0.2, size * 0.2);
    let xOffset = cos(angle) * distance;
    let yOffset = sin(angle) * distance;
    shape.push({ x: x + xOffset, y: y + yOffset });
  }
  return shape;
}


function drawStoredCrater(shape) {
  beginShape();
  for (let point of shape) {
    vertex(point.x, point.y);
  }
  endShape(CLOSE);
}