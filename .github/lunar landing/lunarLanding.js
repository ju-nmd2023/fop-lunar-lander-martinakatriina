let lunarLander = {
  starX: [],
  starY: [],
  starAlpha: [],
  state: "game",
  gameTimer: 0,

  setUp: function () {
    createCanvas(600, 600);
    background(0, 36, 61);
    this.nightSky();
  },
  startScreen: function () {
    background(180, 180, 180);
    textSize(20);
    fill(0, 0, 0);
    text("start", 200, 200);
  },

  moon: function () {
    let x = width / 2;
    let y = height / 2;
    fill(100, 100, 100);
    arc(x, y * 2, x * 1.8, y / 2, PI, 0, CHORD);
  },

  ufo: function () {
    x = width / 2;
    y = height / 2;
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
  },

  nightSky: function () {
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const alpha = Math.random();

      this.starX.push(x);
      this.starY.push(y);
      this.starAlpha.push(alpha);
    }
  },

  //night sky
  draw: function () {
    background(0, 36, 61);
    noStroke();
    for (let index in this.starX) {
      fill(240, 230, 140, Math.abs(Math.sin(starAlpha[index])) * 255);
      ellipse(this.starX[index], this.starY[index], 3);
      this.starAlpha[index] = this.starAlpha[index] + 0.02;
    }
    this.gameScreen();
  },

  gameScreen: function () {
    let x = width / 2;
    let y = height / 2;
    this.moon();
    this.ufo();
  },

  resultScreen: function () {
    background(255, 255, 255);
  },
};

lunarLander.setUp();

function draw() {
  lunarLander.draw();
}

/*
function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
     gameTimer = gameTimer + 1;
    if (gameTimer >= 50) {
      gameTimer = 0;
      state = "result";
    } 
  } else if (state === "result") {
    resultScreen();
  }
}

 function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    state = "game";
  }
} */
