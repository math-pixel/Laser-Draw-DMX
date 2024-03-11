
/* -------------------------------------------------------------------------- */
/*                               Init Variables                               */
/* -------------------------------------------------------------------------- */

let savedPoint = []
let circleSize = 20

let mode = "point"

let mouseOverCanvas;

let font;
let sizeLetter = 100

let indexArray = 0

let timeTimeout = 250

/* -------------------------------------------------------------------------- */
/*                                   Draw P5                                  */
/* -------------------------------------------------------------------------- */

function preload() {
    font = loadFont('font.ttf');
}

function setup() {
    let cnv = createCanvas(400, 400);
    textSize(12);
    frameRate(24);
    cnv.parent('container')
    cnv.style("grid-column",  "2")
    cnv.style("grid-row", "2")
}

function draw() {

    //* switch Mode
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

    //* feedBack nb point draw
    document.getElementById("pointList").innerHTML = "Nb point = " + savedPoint.length
}

/* -------------------------------------------------------------------------- */
/*                                    Mode                                    */
/* -------------------------------------------------------------------------- */

function drawPointMode(){
    background(220);

    let index = 0
    for (let currentPoint of savedPoint) {
        circle(currentPoint.x, currentPoint.y, circleSize);
        text(index, currentPoint.x, currentPoint.y);        

        index += 1
    }
}

function drawLiveMode(){
    background("#A9D3FF");

    line(0, 200, 400, 200);
    line(200, 0, 200, 400);

    

    savedPoint[0] = {x: mouseX, y: mouseY}

}

function drawLetterMode(){

    background("#A9D300");

    //* draw point
    savedPoint.forEach(p =>  {
        point(p.x, p.y);

    });
}

/* -------------------------------------------------------------------------- */
/*                                  SEND DMX                                  */
/* -------------------------------------------------------------------------- */

function sendPointPositionDMX(){

    //* delay send dmx data
    setTimeout(() => {
        
        if (savedPoint.length > 0) {
    
            // console.log("index saved Point : ", indexArray)

            //* Mapping point of canvas
            let xDMX = Math.floor(map_range(savedPoint[indexArray].x, 0, 400, 33, 96))
            let yDMX = Math.floor(map_range(savedPoint[indexArray].y, 0, 400, 33, 96))
            
            //* SEND POINT in DMX
            mySetSimpleDeskChannel(6, xDMX)            
            mySetSimpleDeskChannel(7, yDMX)
            indexArray += 1
    
    
            //* reset index if it's out of range
            if (indexArray >= savedPoint.length) {
                indexArray = 0
            }
        }
        sendPointPositionDMX()
    }, timeTimeout);
    
}
sendPointPositionDMX()


/* -------------------------------------------------------------------------- */
/*                             Graphical Function                             */
/* -------------------------------------------------------------------------- */

function addPoint(x, y){
    if (x > 0 && x < 400 && y > 0 && y < 400) {
        savedPoint.push({ x: x, y: y })
    }
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
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
function addAllElementArrayToAnotherArray(arraySrc, arrayDest){
    arraySrc.forEach(element => {
        arrayDest.push(element)
    })
}

/* -------------------------------------------------------------------------- */
/*                Get all point ( in function of sampleFactor )               */
/*                       of a text and set it on a array                      */
/* -------------------------------------------------------------------------- */
function createLetterPoint(myString, arrayDest){
    arrayDest.length = 0
    addAllElementArrayToAnotherArray(font.textToPoints(myString, 50, 200, sizeLetter, { sampleFactor:  0.2}), arrayDest)
    // addAllElementArrayToAnotherArray(font.textToPoints("A", 50 + sizeLetter / 2, 200,sizeLetter, { sampleFactor:  0.2}), arrayDest)
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}