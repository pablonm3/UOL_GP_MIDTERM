var stepSize = 20;
const x_y_scaler = 0.05
var z_scaler;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  z_scaler = 0.005 * mouseX/100
  colorGrid();
  compassGrid();
}

///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  fill("white")
  noStroke()
  for (var x = 0; x < 25; x++) {
		for (var y = 0; y < 25; y++) {
      var noiseColor = noise(x*x_y_scaler,y*x_y_scaler,frameCount*z_scaler)
      var lerp_amt =  map(noiseColor, 0, 1, 0, 1)
      let from = color(218, 50, 5);
      let to = color(10, 200, 230);
      colorMode(RGB); // Try changing to HSB.
      let interA = lerpColor(from, to, lerp_amt);
			fill(interA)
      rect(x*stepSize, y*stepSize, stepSize, stepSize);
		}
	}
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
  angleMode(DEGREES);
  for (var x = 0; x < 25; x++) {
    for (var y = 0; y < 25; y++) {
        push()
        var noiseCompass = noise(x*x_y_scaler,y*x_y_scaler,frameCount*z_scaler)
        var noise_angle =  map(noiseCompass, 0, 1, 0, 720)
        var noise_lenght =  map(noiseCompass, 0, 1, 0, 4)
        let from = color(255, 215, 0);
        let to = color(100,255,255);
        colorMode(RGB); // Try changing to HSB.
        let color_stroke = lerpColor(from, to, noiseCompass);
        stroke(color_stroke)
        translate(x*stepSize+stepSize/2, y*stepSize+stepSize)
        rotate(noise_angle)
        line(0, 0, 0, -stepSize*noise_lenght);
        pop();
		}
	}

}
