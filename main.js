"use-strict";

const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };


  const buildSplashScreen = () => {
    buildDom(`
        <section class="splash-screen">
            <h1>Geometry War</h1>
            <button>Start</button>
        </section>
        `);
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

  const restartButton = document.querySelector("button");
  restartButton.addEventListener("click", buildGameScreen);
};


  // pantalla para lose
  const buildGameOver = () => {
    buildDom(`
            <section class="game-over fade-in">
                <h1>Game Over Screen</h1>
                <button>Restart</button>
            </section>
        `);

    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
  };

// primera pantalla

  const buildGameScreen = () => {
    const main = document.querySelector("main");
    main.classList.add("fade-in")
    buildDom(`
            <section class="game-screen">
              <table>
                <tr>
                  <th>Fail clicks</th><th>Sobrecarga</th><th>Points</th>
                </tr>
                <tr>
                  <td id="limitFailClicks"></td><td id="limitFigures"></td><th id="guessedClicks">0</th>
                </tr>
              <canvas width =800 height=800> </canvas>
            </section>
            
        `);
     
        var audio = new Audio('audios/gameStart.mp3');
        audio.play()
        



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

    setTimeout(function(){ game.startLoop(); }, 3500);
    //game.startLoop();


    
   
    


  };

  buildSplashScreen();







};

window.addEventListener("load", main);
