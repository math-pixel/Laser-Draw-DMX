
/* -------------------------------------------------------------------------- */
/*                               Init Variables                               */
/* -------------------------------------------------------------------------- */

let savedPoint = []
let circleSize = 20

let mode = "point"


let font;

/* -------------------------------------------------------------------------- */
/*                                   Draw P5                                  */
/* -------------------------------------------------------------------------- */

function preload() {
  font = loadFont('font.ttf');
}

function setup() {
  createCanvas(400, 400);
  textSize(12);


  let points = font.textToPoints("tsasa a d", 50, 50,80, { sampleFactor:  0.2})
  let previousPointX = 0
  points.forEach(p =>  {
    //   point(p.x, p.y);


      if (p.x - previousPointX > 40 ) {
          console.log("new space")
      }

      previousPointX = p.x

  });
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

    let points = font.textToPoints(" ", 50, 50,80, { sampleFactor:  0.2})
    points.forEach(p =>  {     
        point(p.x, p.y);

    });

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

    line(0, 200, 400, 200);
    line(200, 0, 200, 400);

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