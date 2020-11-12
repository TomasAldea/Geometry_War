# Geometry_War

## descripción

Geometry War es un juego para mejorar los reflejos en el que el jugador deberá clickar encima de las figuras geométricas que aparezcan en el tablero.
La dificultad ira incrementando según pase el tiempo y las figuras geométricas cada vez aparecerán mas rápido.
El jugador perderá la partida si se acumulan mas de 15 figuras en el tablero a la vez o falla mas de 15 clicks.

## Estructura de datos

index.html
game.js
player.js
enemy.js
main.js

## 1. archivo index.html

## 2. Archivo principal
  - buildDom
  - crear pantalla Start / cambiar a pantalla game
  - crear pantalla lose or win / cambiar a pantalla start
  

## 3. Constructor de juegos

### Propiedades:
  - figures
  - difficulty
  - failClicks
  - points
  - winPoints
  - limitFigures
  - LimitFailClicks

### Métodos:
  - startLoop
  - restartInterval
  - clearCanvas
  - drawCanvas
  - playerClick
  - checkFailclicks
  - checkNumberFigures
  - checkWinCondition
  - updateStats
  - createFigure
   

## 4. Jugador constructor

### Propiedades:
  - player
  

### Métodos:
  - showCoords
  


## 5. Constructor de figuras

### Propiedades:
  - size
  - icons
  - icons

### Métodos:
  -  drawImg
  -  checkPairClick



## Tareas

- Configurar git y GitHub
- Crea y conectar los diferentes archivos
- BuildDom en main.js
- Crea 3 pantallas en main.js
- Crea transiciones de pantalla en main.js
- Crear constructor de juegos
- Crear constructor de jugador
- Crear constructor de figuras
- Dibuja figuras en game.js
- Crear evento click para jugador
- Compruebe clicks en game.js
- Compruebe el resultado del juego en game.js
- Agrega audios, img y fuentes

## Reserva

. respoinsive
. dar la opcion de elegir tipo de cursor

## Trello

[Link trello](https://trello.com/b/B5niMFza/geometrywar)




## Git 

[Link HitHub](https://github.com/TomasAldea/Geometry_War)
