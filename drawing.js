
/* -------------------------------------------------------------------------- */
/*                               Init Variables                               */
/* -------------------------------------------------------------------------- */

let savedPoint = []
let circleSize = 20

let mode = "live"

let mouseOverCanvas;

let font;
let sizeLetter = 100
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

    frameRate(24);
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


        // SEND POINT in DMX
        let xDMX = Math.floor(map_range(currentPoint[0], 0, 400, 33, 96))
        let yDMX = Math.floor(map_range(currentPoint[1], 0, 400, 33, 96))
        mySetSimpleDeskChannel(6, xDMX)            
        mySetSimpleDeskChannel(7, yDMX)
        

        index += 1
    }
}

function drawLiveMode(){
    background("#A9D3FF");

    line(0, 200, 400, 200);
    line(200, 0, 200, 400);

    
    // SEND DMX
    let xDMX = Math.floor(map_range(mouseX, 0, 400, 33, 96))
    let yDMX = Math.floor(map_range(mouseY, 0, 400, 33, 96))

    if (mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 400) {
        mySetSimpleDeskChannel(6, xDMX)            
        mySetSimpleDeskChannel(7, yDMX)
    }

}

function drawLetterMode(){

    background("#A9D300");

    points.forEach(p =>  {
        point(p.x, p.y);

        // SEND POINT in DMX
        let xDMX = Math.floor(map_range(p.x, 0, 400, 33, 96))
        let yDMX = Math.floor(map_range(p.y, 0, 400, 33, 96))
        mySetSimpleDeskChannel(6, xDMX)            
        mySetSimpleDeskChannel(7, yDMX)

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


function createLetterPoint(myString, arrayDest){
    console.log(typeof(myString), arrayDest)
    arrayDest.length = 0
    addAllElementArrayToAnotherArray(font.textToPoints(myString, 50, 200, sizeLetter, { sampleFactor:  0.2}), arrayDest)
    // addAllElementArrayToAnotherArray(font.textToPoints("A", 50 + sizeLetter / 2, 200,sizeLetter, { sampleFactor:  0.2}), arrayDest)
    console.log(arrayDest)
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}