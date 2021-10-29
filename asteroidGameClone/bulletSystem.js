class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
      // YOUR CODE HERE (3 lines approx)
      function removeElementFromArray(array, e){
          const index = array.indexOf(e)
          array.splice(index, 1)
      }
      this.bullets.forEach(bullet=>{
          if(bullet.x<0 || bullet.x >width || bullet.y<0 || bullet.y >height) removeElementFromArray(this.bullets, bullet);
      })
  }
}
