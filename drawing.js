
/* -------------------------------------------------------------------------- */
/*                               Init Variables                               */
/* -------------------------------------------------------------------------- */

let savedPoint = []
console.log(savedPoint.length)
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
        // console.log("s")


        // // SEND POINT in DMX
        // let xDMX = Math.floor(map_range(currentPoint[0], 0, 400, 33, 96))
        // let yDMX = Math.floor(map_range(currentPoint[1], 0, 400, 33, 96))
        // mySetSimpleDeskChannel(6, xDMX)            
        // mySetSimpleDeskChannel(7, yDMX)
        

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

    savedPoint.forEach(p =>  {
        point(p.x, p.y);

    });
}

/* -------------------------------------------------------------------------- */
/*                                  SEND DMX                                  */
/* -------------------------------------------------------------------------- */

function sendPointPositionDMX(){

    setTimeout(() => {
        
        if (savedPoint.length > 0) {
    
            console.log("index saved Point : ", indexArray)
            // SEND POINT in DMX
            let xDMX = Math.floor(map_range(savedPoint[indexArray].x, 0, 400, 33, 96))
            let yDMX = Math.floor(map_range(savedPoint[indexArray].y, 0, 400, 33, 96))
            console.log(" savepoint : ", savedPoint[indexArray])
            mySetSimpleDeskChannel(6, xDMX)            
            mySetSimpleDeskChannel(7, yDMX)
            indexArray += 1
    
    
            if (indexArray >= savedPoint.length) {
                indexArray = 0
            }
        }
        console.log("loop")
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
    console.log(typeof(value))
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}