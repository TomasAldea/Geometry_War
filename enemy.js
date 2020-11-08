
class Enemy {
    constructor(canvas, x, y) {
      this.randomNumber = function randomInt(min, max) {return min + Math.floor((max - min) * Math.random());}  // generador de numeros aleatorios
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = this.randomNumber(10, 600) // random position             
      this.y = this.randomNumber(10, 600) // random position 
      this.size = this.randomNumber(25, 80) // random size 
      this.icons = ['screens/square.png', "screens/circleBlue.png"]
      this.iconsFail = ['screens/failSquare (2).png', "screens/circleFail.png"]
      this.imageSelected = null;
      this.enemyFigure = false;
      this.healClick = false // vidas
      this.deleteItem=false;
      setTimeout(() => {
        if(this.enemyFigure){
          this.deleteItem=true; 
        }
      }, 2000);
    }


    drawImg() {

      if(!this.imageSelected && Math.random() > 0.70){
        this.enemyFigure = true
      }
      if(!this.imageSelected && Math.random() > 0.50){
        this.healClick = true
      }
      

      if(!this.imageSelected && !this.enemyFigure){
        this.imageSelected = this.icons[Math.floor(Math.random() * this.icons.length)];
      }else if (!this.imageSelected && this.enemyFigure){
        this.imageSelected = this.iconsFail[Math.floor(Math.random() * this.iconsFail.length)];
      }


      var img = new Image(); // HTML5 Constructor
      img.src = this.imageSelected
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

