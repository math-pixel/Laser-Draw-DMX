
/* -------------------------------------------------------------------------- */
/*                               Init Variables                               */
/* -------------------------------------------------------------------------- */

let savedPoint = []
let circleSize = 20

let mode = "letter"


let font;
let points = []
/* -------------------------------------------------------------------------- */
/*                                   Draw P5                                  */
/* -------------------------------------------------------------------------- */

function preload() {
    font = loadFont('font.ttf');
}

function setup() {
    createCanvas(400, 400);
    textSize(12);

    createLetterPoint("NOTHING", points)
}

function draw() {

    switch (mode){

        case "point":
            drawPointMode()
            break;
        case "live":
            drawLiveMode()
            break;
        case "letter":
            drawLetterMode()
            break;

    }
}

/* -------------------------------------------------------------------------- */
/*                                    Mode                                    */
/* -------------------------------------------------------------------------- */

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

    line(0, 200, 400, 200);
    line(200, 0, 200, 400);

}

function drawLetterMode(){

    background("#A9D300");

    points.forEach(p =>  {
        point(p.x, p.y);
    });
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
    console.log(mouseX, mouseY)
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


/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
function addAllElementArrayToAnotherArray(arraySrc, arrayDest){
    arraySrc.forEach(element => {
        arrayDest.push(element)
    })
}


function createLetterPoint(string, arrayDest){
    let s = 100

    //TODO Separate letter string
    addAllElementArrayToAnotherArray(font.textToPoints("T", 50, 200,s, { sampleFactor:  0.2}), arrayDest)
    addAllElementArrayToAnotherArray(font.textToPoints("A", 50 + s / 2, 200,s, { sampleFactor:  0.2}), arrayDest)
    console.log(points)
}