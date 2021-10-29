var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = 10//frameCount;

    push();
        translate(width/2, height/2);

        push()
            rotateAtSpeed(speed/3);
            celestialObj(color(255,150,0), 200); // SUN
        pop()
        push()
            rotateAtSpeed(speed*3);
            translate(0, 150);
            celestialObj(color(160,82,45), 15); // ASTEROID
        pop()

        rotateAtSpeed(speed);
        push()
            translate(0, -300);
            push()
                rotateAtSpeed(speed);
                celestialObj(color(0,0,200), 80); // EARTH
            pop()
     
            rotateAtSpeed(speed * 3, true); // moon spins at 2x earth's speed, need to pass 3x here to counteract the rotation of the entire canvas
            push()
                translate(0, 100);
                celestialObj(color(255,255, 255), 20); // MOON
            pop()
        pop()

    pop();
}

function rotateAtSpeed(speed, invert=false){
    angle = map(millis()* speed/400, 0, 1000, 0, 360)
    if(invert){
        angle = map(millis()* speed/400, 0, 1000, 360, 0)
    }
    rotate(radians(angle))
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
