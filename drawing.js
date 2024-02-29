let savedPoint = []

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  for (const currentPoint of savedPoint) {
    circle(currentPoint[0], currentPoint[1], 20);
  }
}

function addPoint(x, y){
  savedPoint.push([x,y])
}

function mouseDragged() {
  addPoint(mouseX, mouseY)
}

function resetCanvas(){
    savedPoint = []
}