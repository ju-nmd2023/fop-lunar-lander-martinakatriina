let lunarLander = {
  starX: [],
  starY: [],
  starAlpha: [],
  state: "game",
  catY: height - 330,
  velocity: 0.5,
  acceleration: 0.1,
  // gameIsRunning: false,

  setUp: function () {
    createCanvas(600, 600);
    background(0, 36, 61);
    this.nightSky();
  },

  moon: function (x, y) {
    push();
    fill(100, 100, 100);
    arc(x, y * 2, x * 2.3, y / 1.8, PI, 0, CHORD);
    pop();
  },

  cat: function (x, y) {
    push();
    fill(0, 0, 0);
    ellipse(x, y - 200, 15, 15);
    triangle(x - 8, y - 200, x - 8, y - 211, x + 6, y - 200);
    triangle(x - 6, y - 200, x + 8, y - 211, x + 8, y - 200);
    pop();
  },

  ufo: function (x, y) {
    push();
    translate();
    noStroke();
    fill(54, 87, 114);
    ellipse(x, y - 200, 150, 150);
    fill(255, 156, 62);
    arc(x, y - 210, 80, 60, PI, 0, CHORD);
    fill(247, 71, 47);
    arc(x, y - 185, 200, 60, PI, 0, CHORD);
    fill(147, 16, 0);
    arc(x, y - 184, 200, 20, PI, 3.1, CHORD);
    fill(79, 135, 124, 180);
    ellipse(x, y - 180, 100, 5);

    beginShape();
    vertex(x - 40, y - 180);
    vertex(x - 100, y + 250);
    bezierVertex(x - 100, y + 250, x, y + 290, x + 100, y + 250);
    vertex(x + 40, y - 180);
    endShape();
    pop();
  },

  //starry night background
  nightSky: function () {
    background(0, 36, 61);
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const alpha = Math.random();

      this.starX.push(x);
      this.starY.push(y);
      this.starAlpha.push(alpha);
    }
  },

  draw: function () {
    let gameTimer = 0;

    background(0, 36, 61);
    noStroke();
    for (let index in this.starX) {
      fill(240, 230, 140, Math.abs(Math.sin(this.starAlpha[index])) * 255);
      ellipse(this.starX[index], this.starY[index], 3);
      this.starAlpha[index] = this.starAlpha[index] + 0.02;
    }

    if (this.state === "start") {
      this.startScreen();
    } else if (this.state === "game") {
      this.gameScreen();
      gameTimer = gameTimer + 1;
      if (gameTimer >= 5) {
        gameTimer = 0;
        state = "result";
      }
    } else if (this.state === "result") {
      this.resultScreen();
    } else if (this.state === "success") {
      this.successScreen();
    }
  },
  // different screens

  startScreen: function () {
    let x = width / 2;
    let y = height / 2;
    textSize(20);
    fill(255, 255, 255);
    text("Start Game", x - 48, y);
  },

  gameScreen: function () {
    let x = width / 2;
    let y = height / 2;

    this.moon(x, y);
    this.ufo(x, y); // this.ufo();
    this.cat(x, this.catY); // Corrected line

    this.catY = this.catY + this.velocity;
    this.velocity = this.velocity + this.acceleration;

    if (keyIsDown(32)) {
      this.velocity = this.velocity - 0.2;
    }

    if (this.catY >= y + 430) {
      if (this.velocity >= 3) {
        this.state = "result";
      } else {
        this.state = "success";
      }
    }
  },

  successScreen: function () {
    let x = width / 2;
    let y = height / 2;
    this.moon(x, y);
    this.ufo(x, y); // this.ufo();
    this.cat(x, y + 430); // Corrected line

    textSize(20);
    fill(255, 255, 255);
    text("Kitty landed safely!", x - 82, y);
  },

  resultScreen: function () {
    let x = width / 2;
    let y = height / 2;
    this.moon(x, y);
    this.ufo(x, y); // this.ufo();
    this.cat(x, y + 430); // Corrected line
    textSize(20);
    fill(255, 255, 255);
    text("Kitty Crashed", x - 60, y);
  },

  restartGame: function () {
    this.catY = height - 300;
    this.velocity = 0.5;
  },
};
function keyPressed() {
  if (keyCode === 32) {
    if (lunarLander.state === "start") {
      lunarLander.state = "game";
      lunarLander.restartGame();
    } else if (
      lunarLander.state === "result" ||
      lunarLander.state === "success"
    ) {
      lunarLander.state = "start";
      lunarLander.restartGame();
    }
  }
}
lunarLander.setUp();
{
  createCanvas(width, height);
}

function draw() {
  lunarLander.draw();
}
