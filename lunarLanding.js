//set initial variable for the object, to then call in setUp
let lunarLander;

// function to establish canvas size and style
function setup() {
  {
    createCanvas(windowWidth, windowHeight);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }

  //start object that will be later called in draw and setup. define variables for other functions
  lunarLander = {
    starX: [],
    starY: [],
    starAlpha: [],
    state: "game", //starting screen
    catY: height - 360, //starting point for cat
    velocity: 0.5,
    acceleration: 0.1,
    s: 1,

    // setup for initial look of teh game, background and size
    setUp: function () {
      createCanvas(width, height);
      background(0, 36, 61);
      this.nightSky(); //call this. since its inside lunarLander object
    },

    moon: function (x, y) {
      push();
      fill(150, 150, 150);
      arc(x, y * 2, x * 2.3, y / 1.8, PI, 0, CHORD); //middle of screen, middle*2 lower height, width/flatness, how tall, ratio,no section, closed
      fill(180, 180, 180);
      pop();
    },

    cat: function (x, y) {
      push();
      fill(0, 0, 0);
      //body
      rect(x - 9, y - 208, 18, 41, 7);
      rect(x - 15, y - 190, 20, 23, 7);
      ellipse(x - 11, y - 177, 17, 19);
      //ears
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
      //ears
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
      noStroke();
      //background light circle
      fill(54, 87, 114);
      ellipse(x, y - 200, 150 * s, 150 * s);
      //top area
      fill(255, 156, 62);
      arc(x, y - 205, 80 * s, 60 * s, PI, 0, CHORD);
      //orange section
      fill(247, 71, 47);
      arc(x, y - 185, 200 * s, 60 * s, PI, 0, CHORD);
      fill(147, 16, 0);
      arc(x, y - 184, 200 * s, 20 * s, PI, 3.1, CHORD);
      //light circle
      fill(79, 135, 124, 180);
      ellipse(x, y - 180, 100 * s, 5 * s);
      //light
      beginShape();
      vertex(x - 40, y - 180);
      vertex(x - 100, y + 330);
      bezierVertex(x - 100, y + 330, x, y + 370, x + 100, y + 330);
      vertex(x + 40, y - 180);
      endShape();
      pop();
    },

    //starry night background
    nightSky: function () {
      background(0, 36, 61);
      for (let i = 0; i < 200; i++) {
        //start at 0, max of 200, keep adding 1
        const x = Math.floor(Math.random() * width); // position x for star is random position * width
        const y = Math.floor(Math.random() * height); //" same with y
        const alpha = Math.random();
        // push infor for ech star in arrays
        this.starX.push(x);
        this.starY.push(y);
        this.starAlpha.push(alpha);
      }
    },

    draw: function () {
      textSize(20);
      textFont("bold");

      background(0, 36, 61);
      noStroke();

      //draw stars from previous function and call this. since its in object
      for (let index in this.starX) {
        fill(240, 230, 140, Math.abs(Math.sin(this.starAlpha[index])) * 255); //absolute value of number of sin of stars index 0-200
        ellipse(this.starX[index], this.starY[index], 3); //draw circles in random position, size of 3
        this.starAlpha[index] = this.starAlpha[index] + 0.02;
      }
      // check what state it is in and draw the appropriate one depending on what previous screen you are in
      if (this.state === "start") {
        this.startScreen();
      } else if (this.state === "game") {
        this.gameScreen();
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
      this.ufo(x, y - 20, s);
      this.cat(x, this.catY);

      this.catY = this.catY + this.velocity; // change y position for cat depending on acceleration and velocity
      this.velocity = this.velocity + this.acceleration;

      if (keyIsDown(32)) {
        this.velocity = this.velocity - 0.2;
      } // is space is held, velocity decreases

      if (this.catY >= y + 455) {
        // if the position of the cat is middle screen +455 AND velocity is over 2.3 then result screem
        if (this.velocity >= 2.3) {
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
      this.cat(x, y + 455);

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
      this.deadCat(x, y + 455); //call different function depending on fail or success
      fill(255, 255, 255);
      text("KITTY CRASHED", x, y);
    },

    restartGame: function () {
      //restart values to initial height of cat
      this.catY = height - 360;
      this.velocity = 0.5;
    },
  };
  //call the object to start the animation
  lunarLander.setUp();
}
//draw the object with established x and y positions, center of canvas
function draw() {
  lunarLander.draw();
  let x = width / 2;
  let y = height / 2;
}
// function to switch between screens on click
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
