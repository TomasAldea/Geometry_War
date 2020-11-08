
class Enemy {
    constructor(canvas, x, y) {
      this.randomNumber = function randomInt(min, max) {return min + Math.floor((max - min) * Math.random());}  // generador de numeros aleatorios
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = this.randomNumber(10, 600) // random position             
      this.y = this.randomNumber(10, 600) // random position 
      this.size = this.randomNumber(10, 60) // random size 
    }


  
    drawSquare() {
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
      this.ctx.fillStyle = "darkblue";
    }

    drawImg() {
      var img = new Image(); // HTML5 Constructor
      img.src = 'screens/naranja.png';
      this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
     
    }
    
    /*
    drawCircle() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.fillStyle = "darkblue";
      this.ctx.stroke();
    }
    */
   checkPairClick(userX, userY) {
     
    if ((userX > this.x && userX < this.x + this.size) && (userY > this.y && userY < this.y + this.size)) {
      return true;
    } else {
      return false
    }


   }


}

