////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}


////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, { isStatic: true, angle: angle });
  World.add(engine.world, [propeller]);

}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  angle += angleSpeed;
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed)
  fill("white")
  drawVertices(propeller.vertices)
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  fill("red")
  for(var i=0; i<birds.length; i++){
      drawVertices(birds[i].vertices)
      if( isOffScreen(birds[i]) ){
        removeFromWorld(birds[i]);
        birds.splice(i, 1);
        i--
      }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  stack = Composites.stack(700, 100, 3, 6, 0, 0, function(x, y) { 
    return Bodies.rectangle(x, y, 80, 80)
  });
 
   Composite.add(engine.world, [
       stack
   ]);
   for (var i=0; i<3*6;i++){
      colors.push([random(0,50), random(100,256), random(0,50)])
   }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  var bodies = Composite.allBodies(stack);
  bodies.forEach((body, i)=>{
      color_vec = colors[i]
      fill(color_vec[0], color_vec[1], color_vec[2]);
      drawVertices(body.vertices);
  })
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
    slingshotBird = Bodies.circle(200, 200, 30, {friction: 0,
    restitution: 0.95 });
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
    slingshotConstraint = Constraint.create({
      bodyA: slingshotBird,
      pointA: {x:0, y:0},
      pointB:  {x:200, y:200},
      stiffness: 0.01,
      damping: 0.0001
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  stroke(255);
  // your code here
  fill("#FFA500")
  drawVertices(slingshotBird.vertices)
  fill("white")
  if(slingshotConstraint)
    drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
  Events.on(mouseConstraint, "mouseup", ()=>{
      setTimeout(() => {
          removeFromWorld(slingshotConstraint)
          slingshotConstraint = null
      }, 100);
  })
}
