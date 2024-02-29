
/* -------------------------------------------------------------------------- */
/*                               Init Variables                               */
/* -------------------------------------------------------------------------- */

let savedPoint = []
let circleSize = 20

let mode = "point"


/* -------------------------------------------------------------------------- */
/*                                   Draw P5                                  */
/* -------------------------------------------------------------------------- */

function setup() {
  createCanvas(400, 400);
}

function draw() {

    switch (mode){

        case "point":
            drawPointMode()
            break;
        case "live":
            drawLiveMode()
            break;

    }

}

function drawPointMode(){
    background(220);

    let index = 0
    for (let currentPoint of savedPoint) {
        circle(currentPoint[0], currentPoint[1], circleSize);
        text(index, currentPoint[0], currentPoint[1]);
        // console.log("s")
        index += 1
    }
}

function drawLiveMode(){
    background("#A9D3FF");

}


/* -------------------------------------------------------------------------- */
/*                             Graphical Function                             */
/* -------------------------------------------------------------------------- */

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


/* -------------------------------------------------------------------------- */
/*                               Logic Function                               */
/* -------------------------------------------------------------------------- */

function toggleMode(){
    if (mode == "point") {
        mode = "live"  
    }else if(mode == "live"){
        mode = "point"
    }else{
        print("error mode")
    }

}