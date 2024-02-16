function setup() {
  createCanvas(600, 600);
  background(0, 36, 61);
}

function startScreen() {
  background(180, 180, 180);
  textSize(20);
  fill(0);
  text("start", 200, 200);
}

// game screen
function moon(x, y) {
  fill(180, 180, 180);
  arc(300, 600, 630, 150, PI, 0, CHORD);
}

function ufo() {
  ufoX = width / 2;
  ufoY = height / 2;
  ufoSize = 80;
}

function gameScreen(x, y, s) {
  s = 1;
  x = 100;
  y = 100;

  ufo(x, y, s);
  moon();
}

function resultScreen() {
  background(255, 255, 255);
}

let state = "game";
let gameTimer = 0;

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
    /* gameTimer = gameTimer + 1;
    if (gameTimer >= 50) {
      gameTimer = 0;
      state = "result";
    } */
  } else if (state === "result") {
    resultScreen();
  }
}

/* function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    state = "game";
  }
} 
