class GameHandler {

    constructor() {
      this.timeLeft = 60;
      setInterval(()=>{
        this.timeLeft -= 1;
      }, 1000)
    }

    isGameOver(){
        return this.timeLeft <= 0
    }

    isGameWon(bodies){
        for (var i=0; i<bodies.length; i++){
            const bodyPos = bodies[i].position;
            if(bodyPos.x>0 && bodyPos.y < width){
                return false
            }
        }
        return true
    }


}