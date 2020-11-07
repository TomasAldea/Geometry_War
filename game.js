"use strict";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.enemies = []
    this.count = 0
    
  }

  startLoop() {

    const loop = () => {
      if (Math.random() > 0.90) {
        const y = Math.random() * this.canvas.height;
        const x = Math.random() * this.canvas.width;
        this.enemies.push(new Enemy(this.canvas, x, y));
      }
      //this.updateCanvas();
      //this.clearCanvas();
      this.count++
      this.drawCanvas();
      
      if (this.count < 80) {
        window.requestAnimationFrame(loop);
      }
      
    };

    window.requestAnimationFrame(loop);
  }

  
  updateCanvas() {
    this.player.update();
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
  
    this.enemies.forEach((enemy) => {
     enemy.drawSquare()
    });                                           
  
  }

  playerClick(userX, userY) {
    this.enemies.forEach((enemy, index) => {
      enemy.checkPairClick(userX, userY);
      //this.enemies.splice(index, 1)
   })

  }



} 
