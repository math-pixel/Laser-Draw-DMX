let savedPoint = []

let circleSize = 20

function setup() {
  createCanvas(400, 400);
}

function draw() {

    background(220);

    let index = 0
    for (let currentPoint of savedPoint) {
        circle(currentPoint[0], currentPoint[1], circleSize);
        text(index, currentPoint[0], currentPoint[1]);
        // console.log("s")
        index += 1
    }

}

function addPoint(x, y){
  savedPoint.push([x,y])
}

function mouseDragged() {
  addPoint(mouseX, mouseY)
}

function mouseReleased(){
  addPoint(mouseX, mouseY)
}

function resetCanvas(){
    savedPoint = []
}