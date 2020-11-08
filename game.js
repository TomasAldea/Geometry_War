"use strict";

class Game {
  constructor(canvas, gameOverCallback, gameWinCallback) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.figures = [];
    this.intervalId = null;
    this.difficulty = 1500; // tiempo en que genera figuras
    this.initFigure = true;
    this.failClick = 0;
    this.points = 0;
    this.gameOverCallback = gameOverCallback;
    this.gameWinCallback = gameWinCallback;
    this.levels = 0;
    this.winPoints = 2500; // puntos para ganar
    this.backGoundMusic = new Audio("audios/backgroundGame.mp3");
    this.backGoundMusic.volume = 0.08;
    this.backGoundMusic.play();
    //limites de errores
    this.limitFigures = 15;
    this.limitFailClicks = 15;
  }

  // loop para generar cuadrados en el canvas
  startLoop() {
    this.backGoundMusic;

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
    // shakes dispersos

    if (this.points == 200) {
      this.sounds++;
      var shakeCanvas = document.querySelector("canvas");
      shakeCanvas.classList.add("shake");

      setTimeout(() => {
        shakeCanvas.classList.remove("shake");
      }, 1500);
    }
    if (this.points == 400) {
      var shakeCanvas = document.querySelector("canvas");
      shakeCanvas.classList.add("shake-chunk");

      setTimeout(() => {
        shakeCanvas.classList.remove("shake-chunk");
      }, 1500);
    }
    if (this.points == 600) {
      var shakeCanvas = document.querySelector("canvas");
      shakeCanvas.classList.add("shake-chunk");

      setTimeout(() => {
        shakeCanvas.classList.remove("shake-chunk");
      }, 1500);
    }
    if (this.points == 700) {
      var shakeCanvas = document.querySelector("canvas");
      shakeCanvas.classList.add("shake-chunk");

      setTimeout(() => {
        shakeCanvas.classList.remove("shake-chunk");
      }, 1500);
    }
    // primer nivel de dificultad
    if (this.points == 500 && this.levels == 0) {
      clearInterval(this.intervalId);
      this.difficulty = this.difficulty - 500;
      this.initFigure = true;
      this.levels += 1;

      var shakeCanvas = document.querySelector("canvas");
      shakeCanvas.classList.add("shake");

      // segundo nivel de dificultad
    }
    if (this.points == 1000 && this.levels == 1) {
      clearInterval(this.intervalId);
      this.difficulty = this.difficulty - 200;

      this.initFigure = true;
      this.levels += 1;

      var shakeCanvas = document.querySelector("canvas");
      shakeCanvas.classList.add("shake-opacity");

      // tercer nivel de dificultad
    }
    if (this.points == 1500 && this.levels == 2) {
      clearInterval(this.intervalId);
      this.difficulty = this.difficulty - 500;
      this.initFigure = true;
      this.levels += 1;
      // audio
      var audioLastLevel = new Audio("audios/lastLevelSound.mp3");
      audioLastLevel.volume = 0.1;
      audioLastLevel.play();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // dibujamos figuras
  drawCanvas() {
    this.figures.forEach((enemy, index) => {
      if (enemy.deleteItem) {
        this.figures.splice(index, 1);
      }
      enemy.drawImg();
    });
  }

  // checkeo de clicks del juagador + registro de puntos/fallos
  playerClick(userX, userY) {
    var pairClick = 0;

    this.figures.forEach((enemy, index) => {
      if (enemy.checkPairClick(userX, userY) && !enemy.enemyFigure) {
        var audioPairClick = new Audio("audios/pairClick.mp3");
        audioPairClick.volume = 0.2;
        audioPairClick.play();
        this.points = this.points + 50;
        this.checkWinCondition();

        this.figures.splice(index, 1);
        pairClick = true;
      } else if (enemy.checkPairClick(userX, userY) && enemy.enemyFigure) {
        var audioFailSquare = new Audio("audios/errorCuadrado.mp3");
        audioFailSquare.play();
        audioFailSquare.volume = 0.2;

        var shakeCanvas = document.querySelector("canvas");
        shakeCanvas.classList.add("shake-crazy");
        setTimeout(() => {
          shakeCanvas.classList.remove("shake-crazy");
        }, 1000);

        this.points = this.points - 50;
        this.failClick++;
        pairClick = true;
      }
    });

    if (!pairClick) {
      var audioFailClick = new Audio("audios/failClick.mp3");
      audioFailClick.volume = 0.2;
      audioFailClick.play();
      
      
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
    this.backGoundMusic.muted = true;
    var audioLose = new Audio("audios/gameover.mp3");
    audioLose.play();
    audioLose.volume = 0.2;
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
    this.backGoundMusic.muted = true;
    this.gameWinCallback();
    clearInterval(this.intervalId);
  }

  // checkeo para win
  checkWinCondition() {
    if (this.points == this.winPoints) {
      var audioWin = new Audio("audios/winScreen.mp3");
      audioWin.volume = 0.2;
      audioWin.play();
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
