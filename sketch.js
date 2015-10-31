var circle = [];
var numCircles = 70;
var buttons, btnPos = null;
var a = 0;
var blue, white, bgColor, titleHover = false;

function setup(){
  // setup canvas
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0, 0);
  myCanvas.style("z-index", "-1");
  blue = color(199, 216, 235);
  white = color(255);
  bgColor = white;
  
  // select buttons
  buttons = selectAll('.navbar');
  
  // set up circle particles
  for(var i = 0; i < numCircles; i++){
    circle[i] = new Circles();
  }
}

function draw(){
  //bgColor = lerpColor(white, blue, a);
  background(bgColor);
  
  for(var i = 0; i < numCircles; i++){
    circle[i].draw();
  }
  
  for(var i = 0; i < buttons.length; i++){
    buttons[i].mouseOver(highlight);
    buttons[i].mouseOut(unhighlight);
  }
  
//    if(titleHover){
//    select('.title').style('color', 'white');
//    a+=0.05;
//    if(a > 1) a = 1; 
//  } else {
//    a -= 1;
//    if(a < 0) a = 0;
//  }
  
//  select('.title').mouseOver(backgroundChange);
//  select('.title').mouseOut(backgroundChange);
}

function highlight(){
  btnPos = createVector(this.position().x, this.position().y);
}

function unhighlight(){
  btnPos = null;
}

//function backgroundChange(){
//  titleHover = !titleHover;
//}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}