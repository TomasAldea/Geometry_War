"use-strict";


const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };


  const buildSplashScreen = () => {
    buildDom(`
        <section class="splash-screen">
            <h1 class="first-screen">Geometry war</h1>
            <button>Start</button>
        </section>
        `);
    const startButton = document.querySelector("button");
    startButton.addEventListener("click", buildGameScreen);
  };

  const buildGameScreen = () => {
    buildDom(`
            <section class="game-screen">
            <canvas width =800 height=800> </canvas>
            </section>
            
        `);
    
        const image = document.createElement('img')
        image.src  = 'screens/gameScreen.jpg'
        document.querySelector('.container').appendChild(image)
 
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")

    
    const game = new Game(canvas);
    /*
    function playerClick(event) {
      game.playerClick(event.clientX, event.clientY)
  
    }
    canvas.addEventListener("click", playerClick)
    */


   function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top; 
    
    game.playerClick(x, y)
   
} 


  
canvas.addEventListener("mousedown", function(e) 
{ 
  //console.log("mousedown")
    getMousePosition(canvas, e); 


}); 

    game.startLoop();
  
  };

  buildSplashScreen();
};

window.addEventListener("load", main);
