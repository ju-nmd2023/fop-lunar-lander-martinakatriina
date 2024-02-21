let lunarLander = {
  starX: [],
  starY: [],
  starAlpha: [],
  state: "game",
  catY: height - 265,
  velocity: 0.5,
  acceleration: 0.1,
  s: 1,
  // gameIsRunning: false,

  setUp: function () {
    createCanvas(600, 600);
    background(0, 36, 61);
    this.nightSky();
  },

  moon: function (x, y) {
    push();
    fill(150, 150, 150);
    arc(x, y * 2, x * 2.3, y / 1.8, PI, 0, CHORD);
    fill(180, 180, 180);
    ellipse(x - 280, y + 263, 100, 25);
    fill(100, 100, 100);
    ellipse(x - 279, y + 260, 100, 25);

    fill(180, 180, 180);
    ellipse(x - 152, y + 290, 40, 15);
    fill(100, 100, 100);
    ellipse(x - 151, y + 287, 40, 15);
    pop();
  },

  cat: function (x, y) {
    push();
    fill(0, 0, 0);
    //body
    rect(x - 9, y - 208, 18, 41, 7);
    rect(x - 15, y - 190, 20, 23, 7);
    ellipse(x - 11, y - 177, 17, 19);
    triangle(x - 8, y - 200, x - 8, y - 211, x + 6, y - 200);
    triangle(x - 6, y - 200, x + 8, y - 211, x + 8, y - 200);
    //tail

    ellipse(x - 16, y - 180, 3, 22, 4);
    ellipse(x - 18, y - 192, 5, 6, 4);
    rect(x - 20, y - 192, 5, 15, 4);
    fill(200, 200, 0);
    ellipse(x - 3.8, y - 201, 5.3, 5.3);
    ellipse(x + 3.8, y - 201, 5.3, 5.3);
    //eyes
    fill(0, 0, 0);
    ellipse(x - 3.8, y - 201, 3, 3);
    ellipse(x + 3.8, y - 201, 3, 3);

    //helmet
    fill(180, 180, 180, 100);
    ellipse(x, y - 203, 30, 30);
    fill(180, 180, 180, 200);
    rect(x - 12.7, y - 193, 26, 5, 20);

    pop();
  },

  deadCat: function (x, y) {
    push();
    fill(0, 0, 0);
    //body
    rect(x - 9, y - 208, 18, 41, 7);
    rect(x - 15, y - 190, 20, 23, 7);
    ellipse(x - 11, y - 177, 17, 19);
    triangle(x - 8, y - 200, x - 8, y - 211, x + 6, y - 200);
    triangle(x - 6, y - 200, x + 8, y - 211, x + 8, y - 200);
    //tail

    ellipse(x - 16, y - 180, 3, 22, 4);
    ellipse(x - 18, y - 192, 5, 6, 4);
    rect(x - 20, y - 192, 5, 15, 4);

    //eyes

    stroke(200, 200, 0);
    strokeWeight(2);
    line(x - 7, y - 203, x - 2, y - 198);
    line(x - 7, y - 198, x - 2, y - 203);
    line(x + 2, y - 203, x + 7, y - 198);
    line(x + 2, y - 198, x + 7, y - 203);

    //helmet
    noStroke();
    fill(180, 180, 180, 100);
    ellipse(x, y - 203, 30, 30);
    fill(180, 180, 180, 200);
    rect(x - 12.7, y - 193, 26, 5, 20);

    pop();
  },

  ufo: function (x, y, s) {
    push();
    translate();
    noStroke();
    fill(54, 87, 114);
    ellipse(x, y - 200, 150 * s, 150 * s);
    fill(255, 156, 62);
    arc(x, y - 205, 80 * s, 60 * s, PI, 0, CHORD);
    fill(247, 71, 47);
    arc(x, y - 185, 200 * s, 60 * s, PI, 0, CHORD);
    fill(147, 16, 0);
    arc(x, y - 184, 200 * s, 20 * s, PI, 3.1, CHORD);
    fill(79, 135, 124, 180);
    ellipse(x, y - 180, 100 * s, 5 * s);

    beginShape();
    vertex(x - 40, y - 180);
    vertex(x - 100, y + 300);
    bezierVertex(x - 100, y + 300, x, y + 340, x + 100, y + 300);
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
    textSize(20); // Adjust the size as needed
    textFont("bold");

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
        this.state = "result";
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
    text("KITTY LANDER", x, y);
    text("press space to start", x, y + 30);
  },

  gameScreen: function () {
    let x = width / 2;
    let y = height / 2;
    let s = 0.9;
    this.moon(x, y);
    this.ufo(x, y - 20, s); // this.ufo();
    this.cat(x, this.catY);

    this.catY = this.catY + this.velocity;
    this.velocity = this.velocity + this.acceleration;

    if (keyIsDown(32)) {
      this.velocity = this.velocity - 0.2;
    }

    if (this.catY >= y + 410) {
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
    let s = 0.9;
    this.moon(x, y);
    this.ufo(x, y - 20, s);
    this.cat(x, y + 410);

    textSize(20);
    fill(255, 255, 255);
    text("KITTY LANDED SAFELY!", x, y);
  },

  resultScreen: function () {
    let x = width / 2;
    let y = height / 2;
    let s = 0.9;
    this.moon(x, y);
    this.ufo(x, y - 20, s);
    this.deadCat(x, y + 410);
    fill(255, 255, 255);
    text("KITTY CRASHED", x, y);
  },

  restartGame: function () {
    this.catY = height - 265;
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
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
}

function draw() {
  lunarLander.draw();
  let x = width / 2;
  let y = height / 2;
}
