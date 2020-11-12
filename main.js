"use-strict";

const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };

  const buildSplashScreen = () => {
    buildDom(`
        <section class="splash-screen">      
            <h1 class="animate__animated animate__zoomInDown animate__delay-1s">Geometry War</h1>
            <button class="animate__animated animate__zoomInUp animate__delay-1s">Start</button>
            <h2 class="animate__animated animate__zoomInUp animate__delay-1s"> 
            <u>Objective</u> <br> Make the figures disappear with your mouse.<br>
            <u>Win condition</u> <br>  Make 2500 points clearing figures.<br>
            <u>Lose condition</u> <br> Missclick 15 times or accumulate 15 squares
            </h2>
            <div class="animate__animated animate__zoomInRight animate__delay-1s">
            <img src="screens/circleBlue.png"  width="50" height="50"> 
            <img src="screens/square.png"  width="50" height="50"> 
            <h2>+ 50 points</h2>
            </div>
            <div class="animate__animated animate__zoomInLeft animate__delay-1s">
            <img src="screens/circleFail.png"  width="50" height="50"> 
            <img src="screens/failSquare (2).png"  width="50" height="50"> 
            <h2>- 50 points and shake hard!</h2>
            </div>
            
    
        </section>
        `);

    /*
      BLOQUEADO POR POLITICA DE CRHOME
      var audioStart = new Audio('audios/street-fighter-winMusic.mp3');
      audioStart.play()
      */

    const startButton = document.querySelector("button");

    startButton.addEventListener("click", buildGameScreen);
  };

  // pantalla para win

  const buildGameWin = () => {
    buildDom(`
          <section class="game-win">
              <h1>¡You win!</h1>
              <button>Restart</button>
          </section>
      `);

    // confetti.start();

    var audioWin = new Audio("audios/street-fighter-winMusic.mp3");
    audioWin.play();
    audioWin.volume = 0.2;
    const pauseAudio = () => {
      audioWin.muted = true;
    };

    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", pauseAudio);
    restartButton.addEventListener("click", buildGameScreen);
  };

  // pantalla para lose
  const buildGameOver = () => {
    buildDom(`
            <section class="game-over fade-in">
                <h1>Game Over</h1>
                <button>Restart</button>
            </section>
        `);

    const restartButton = document.querySelector("button");

    restartButton.addEventListener("click", buildGameScreen);
  };

  // primera pantalla

  const buildGameScreen = () => {
    const main = document.querySelector("main");
    main.classList.add("fade-in");
    buildDom(`
            <section class="game-screen">
              <table class="game-table">
                <tr>
                  <th>MissClicks</th><th>Total figures</th><th>Total Points</th>
                </tr>
                <tr>
                  <td id="limitFailClicks"></td><td id="limitFigures"></td><th id="guessedClicks">0</th>
                </tr>
              <canvas width =800 height=800> </canvas>
            </section>
            
        `);

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const game = new Game(canvas, buildGameOver, buildGameWin);

    function getMousePosition(canvas, event) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      game.playerClick(x, y);
    }

    canvas.addEventListener("mousedown", function (e) {
      getMousePosition(canvas, e);
    });

    setTimeout(function () {
      game.startLoop();
    }, 3000);
  };

  buildSplashScreen();
};

window.addEventListener("load", main);
