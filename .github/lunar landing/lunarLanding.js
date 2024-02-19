let lunarLander = {
  starX: [],
  starY: [],
  starAlpha: [],
  state: "game",
  gameTimer: 0,

  setUp: function () {
    push();
    createCanvas(600, 600);
    background(0, 36, 61);
    this.nightSky();
    pop();
  },

  moon: function (x, y) {
    push();
    fill(100, 100, 100);
    arc(x, y * 2, x * 2.3, y / 2, PI, 0, CHORD);
    pop();
  },

  ufo: function (x, y) {
    let ufoY = 100;
    let velocity = 0.5;
    let acceleration = 0.1;
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
    fill(79, 135, 124);
    ellipse(x, y - 180, 100, 5);

    beginShape();
    vertex(x - 40, y - 180);
    vertex(x - 100, y + 250);
    bezierVertex(x - 20, y + 250, x + 40, y + 250, x + 40, y + 250); // Add curves
    vertex(x + 100, y + 250);
    vertex(x + 40, y - 180);
    endShape();
    pop();

    this.ufo(100, ufoY);
    ufoY = ufoY + velocity;
    velocity = velocity + acceleration;
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
    background(0, 36, 61);
    noStroke();
    for (let index in this.starX) {
      fill(240, 230, 140, Math.abs(Math.sin(this.starAlpha[index])) * 255);
      ellipse(this.starX[index], this.starY[index], 3);
      this.starAlpha[index] = this.starAlpha[index] + 0.02;
    }

    this.gameScreen();
  },

  // different screens

  startScreen: function () {
    textSize(20);
    fill(255, 255, 255);
    text("Start Game", 200, 200);
  },

  gameScreen: function () {
    let x = width / 2;
    let y = height / 2;
    lunarLander.moon(width / 2, height / 2);
    lunarLander.ufo(width / 2, height / 2); // this.ufo();
  },

  resultScreen: function () {
    textSize(20);
    fill(255, 255, 255);
    text("Game Over", 200, 200);
  },

  // on click
  /*draw: function () {
    if (this.state === "start") {
      this.startScreen();
    } else if (this.state === "game") {
      this.gameScreen();
      this.gameTimer = this.gameTimer + 1;
      if (this.gameTimer >= 100) {
        this.gameTimer = 0;
        this.state = "result";
      }
    } else if (state === "result") {
      this.resultScreen();
    }
  },
*/
  mouseClicked: function () {
    if (this.state === "start") {
      this.state = "game";
    } else if (this.state === "game") {
      this.state = "result";
    } else if (this.state === "result") {
      this.state = "game";
    }
  },
};

lunarLander.setUp();
{
  createCanvas(width, height);
}

function draw() {
  lunarLander.draw();
}
