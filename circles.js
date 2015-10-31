
//---------------- setup
function Circles(){
  this.position = createVector(random(width),random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.direction = createVector(0, 0);
  this.topspeed = random(5, 10);
  this.brightness = randomGaussian(200, 40);
  this.alpha = 0;
  this.originalSize = randomGaussian(40, 10);
  this.size = this.originalSize;
}

//-------------- update
Circles.prototype.update = function(){
  // calculate direction from circle position to mouse
  this.mouse = createVector(mouseX, mouseY);
  this.direction = p5.Vector.sub(this.mouse, this.position);
  this.direction.normalize();
  this.direction.mult(random(0.5));

  // accelerate towards mouse on press
  if(!mouseIsPressed && btnPos === null){
    this.acceleration.set(0, 0);
    this.velocity.mult(0.97);
  } else if(mouseIsPressed || btnPos !== null) {
    this.acceleration = this.direction;
  }

  // math
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.topspeed);
  this.position.add(this.velocity);
  
  // reactions to navbar being highlighted
  if(btnPos != null) this.highlight();
  else this.unhighlight();
}

//-------------- draw
Circles.prototype.draw = function(){
  this.update();
  
  ellipse(this.position.x, this.position.y, this.size, this.size);
}

//------------- highlight action
Circles.prototype.highlight = function(){
  // accelerate towards link on highlight
  this.acceleration = this.direction;
  this.position.add(this.velocity);
  
  // shrink circle size
  this.size*=0.97;
  if(this.size < 10) this.size = 10;
  
  // change circle color to blue
  this.alpha+=5;
  if(this.alpha > 255) this.alpha = 255;
  var reverseAlpha = map(this.alpha, 0, 255, 255, 0);
  
  stroke(this.brightness, reverseAlpha);
  fill(199, 216, 235, this.alpha);
}

//------------- unhighlight action
Circles.prototype.unhighlight = function(){
  // restore circles to original size
  this.size*=1.3;
  if(this.size > this.originalSize){
    this.size = this.originalSize;
  }
  
  // restore circle color to original
  this.alpha-=5;
  if(this.alpha < 0) this.alpha = 0;
  stroke(this.brightness);
}