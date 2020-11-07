
class Enemy {
    constructor(canvas, x, y) {
      this.randomNumber = function randomInt(min, max) {return min + Math.floor((max - min) * Math.random());}  // generador de numeros aleatorios
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = this.randomNumber(10, 600) // random position             
      this.y = this.randomNumber(10, 600) // random position 
      this.size = this.randomNumber(10, 60) // random size 
      this.area = (this.x + this.size) * (this.y + this.size)
    }


  
    drawSquare() {
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.size, this.size);
      this.ctx.stroke();
      console.log(this.x + ' ' + (this.x + this.size))
    }
    
    drawCircle() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.ctx.stroke();
    }

   checkPairClick(userX, userY) {
     
    if ((userX > this.x && userX < this.x + this.size)&&(userY > this.y && userY < this.y + this.size)) {
      console.log("pairClick")
      return true;
    }
    return false

   }


}

