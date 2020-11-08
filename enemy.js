
class Enemy {
    constructor(canvas, x, y) {
      this.randomNumber = function randomInt(min, max) {return min + Math.floor((max - min) * Math.random());}  // generador de numeros aleatorios
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = this.randomNumber(10, 600) // random position             
      this.y = this.randomNumber(10, 600) // random position 
      this.size = this.randomNumber(25, 80) // random size 
      this.icons = ['screens/square.png', "screens/naranja.png"]
    }


    drawImg() {
      //let randomImg = this.icons[Math.floor(Math.random() * this.icons.length)];
      var img = new Image(); // HTML5 Constructor
      img.src = 'screens/square.png'
      this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }


  
   checkPairClick(userX, userY) {
    
    if ((userX > this.x && userX < this.x + this.size) && (userY > this.y && userY < this.y + this.size)) {
      return true;
    } else {
      return false
    }


   }


}

