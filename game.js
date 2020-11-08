"use strict";

class Game {
  constructor(canvas, gameOverCallback, gameWinCallback) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.figures = [];
    this.intervalId = null;
    this.difficulty = 2500; // tiempo en que genera figuras
    this.initFigure = true;
    this.failClick = 0;
    this.points = 0;
    this.gameOverCallback = gameOverCallback;
    this.gameWinCallback = gameWinCallback;
    this.levels = 0;
    this.winPoints = 50 // puntos para ganar
    //limites de errores
    this.limitFigures = 20;
    this.limitFailClicks = 20;
  }

  // loop para generar cuadrados en el canvas
  startLoop() {
    
    const loop = () => {
      if (this.initFigure) {
        this.createFigure();
        
        this.initFigure = false;
      }
      
      this.restartInterval();
      this.clearCanvas();
      this.drawCanvas();
    
      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  }

  // resetar el set interval y modifical el tiempo
  restartInterval() {
  // primer nivel de dificultad
    if (this.points == 500 && this.levels == 0){
      clearInterval(this.intervalId);
      this.difficulty = this.difficulty - 1000;    
      this.initFigure = true;
      this.levels+=1

     var shakeCanvas = document.querySelector("canvas");
     shakeCanvas.classList.add("shake-opacity")
      

  // segundo nivel de dificultad
    } if (this.points == 1000 && this.levels == 1){

      clearInterval(this.intervalId);
      this.difficulty = this.difficulty - 500;   
      var audioLastLevel = new Audio('audios/lastLevelSound.mp3');
      audioLastLevel.play() 
      this.initFigure = true;
      this.levels+=1

      
      var shakeCanvas = document.querySelector("canvas");
      shakeCanvas.classList.add("shake-little")


  // tercer nivel de dificultad
    } if (this.points == 1500 && this.levels == 2){
    clearInterval(this.intervalId);
    this.difficulty = this.difficulty - 500;    
    this.initFigure = true;
    this.levels+=1
  }
}

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // dibujamos cuadrados
  drawCanvas() {
    this.figures.forEach((enemy) => {
      enemy.drawSquare();
      // enemy.drawCircle();
      enemy.drawImg()
    });
  }

  // checkeo de clicks del juagador + registro de puntos/fallos
  playerClick(userX, userY) {
    var pairClick = 0;
    this.figures.forEach((enemy, index) => {
      if (enemy.checkPairClick(userX, userY)) {
        var audio = new Audio("audios/pairClick.mp3");
        audio.play();
        this.points = this.points + 50;
        this.checkWinCondition();
      
        this.figures.splice(index, 1);
        pairClick = true;

      }
    });

    if (!pairClick) {
      var audio = new Audio('../audios/failClick.mp3');
      audio.play()
      this.failClick++;
    }
    this.checkFailclicks();
    this.updateStats();
    
  }

  // checkeo para lose por maximo de fail clicks
  checkFailclicks() {
    if (this.failClick >= this.limitFailClicks) {
      this.gameOver();
    }
    this.updateStats();
  }

  //callback gameover
  gameOver() {
    var audioLose = new Audio('audios/game over.mp3');
    audioLose.play()
    this.gameOverCallback();
    clearInterval(this.intervalId);
  }

     // checkeo para lose por maximo de figuras
    checkNumberFigures() {
      if (this.figures.length >= this.limitFigures) {
        this.gameOver();
      }
      this.updateStats();
    }

  //callback win
  gameWin() {
    this.gameWinCallback();
    clearInterval(this.intervalId);
  }

  // checkeo para win 
  checkWinCondition() {
    if (this.points == this.winPoints) {
      var audioWin = new Audio("audios/winScreen.mp3");
      audioWin.play();
      console.log(" win win win win")
      this.gameWin();
    }
  }

  //Actualizaremos el DOM con los datos actuales
  updateStats() {
    // figuras
    var limitFiguresDOM = document.getElementById("limitFigures");
    if (limitFiguresDOM) {
      limitFiguresDOM.innerText = this.figures.length + "/" + this.limitFigures;
    }
    
    // clicksFallidos
    var limitFailClicksDOM = document.getElementById("limitFailClicks");
    limitFailClicksDOM.innerText = this.failClick + "/" + this.limitFailClicks;
    // clicksAcertados
    var limitGuessedClicksDOM = document.getElementById("guessedClicks");
    limitGuessedClicksDOM.innerText = this.points;
  }

  createFigure() {
    this.intervalId = setInterval(() => {
      const y = Math.random() * this.canvas.height;
      const x = Math.random() * this.canvas.width;
      this.figures.push(new Enemy(this.canvas, x, y));
      this.checkNumberFigures();
    }, this.difficulty);
  }
}
