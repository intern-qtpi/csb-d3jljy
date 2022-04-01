/* eslint-disable no-undef, no-unused-vars */
function setup() {
  createCanvas(600, 400);
  // Starting position of the ball
  x_start = 50;
  y_start = 325;
  mouseJustPressed = 0;
  shotMade = 0;
  score = 0;
  tries = 0;
  rims = 0;
  bricks = 0;
  textDisplay = 0;
  skyBall = 0;
  scoreCounted = 0;
  // Initialize variables x and y to ball start position
  // x and y are the screen coordinates of the ball
  x = x_start;
  y = y_start;
  // Hoop location
  hoopX = 500;
  hoopY = 150;
  // Direction the ball is moving? up or down
  direction = 1;
  speedX = 0.3; // this is really the x-speed
  speedY = -9;
  speed = sqrt(speedX * speedX + speedY * speedY);
  g = -0.3;
  // Let Ball Fly
  shoot = 0;
  // Basketball radius
  radius = 20;
}

function draw() {
  textAlign(CENTER);
  background(220);
  fill(210, 180, 140); // This is color of rect below
  rect(0, 200, 600, 200); // (x, y, width, height)
  // Coding assignment!  Play around with the values below, try to copy and paste to make a stadium steps
  // First step
  fill(210, 255, 140); // This is color of rect below
  rect(25, 175, 550, 25); // (x, y, width, height)
  // second step
  fill(205, 250, 135); // This is color of rect below
  rect(50, 150, 500, 25); // (x, y, width, height)
  // Third Step
  fill(200, 245, 130); // This is color of rect below
  rect(75, 125, 450, 25);
  // Fourth step
  fill(195, 240, 125); // This is color of rect below
  rect(100, 100, 400, 25);
  fill(205, 250, 135); // This is color of rect below
  rect(125, 75, 350, 25);
  fill(205, 250, 135); // This is color of rect below
  rect(150, 50, 300, 25);
  fill(0);
  textSize(28);
  text("Buckets: " + score, 300, 35);
  noFill();
  stroke(0);
  strokeWeight(4);
  stroke(255, 140, 0);
  ellipse(hoopX, hoopY, radius * 3, radius / 2);
  stroke(0);
  fill(0, 0, 0);
  quad(
    hoopX + (radius * 3) / 2 - radius / 5,
    hoopY - radius / 5,
    hoopX + (radius * 3) / 2 + radius * 0.75 - radius / 5,
    hoopY + radius / 5,
    hoopX + (radius * 3) / 2 + radius * 0.75 - radius / 5,
    hoopY - radius * 3 + radius / 5,
    hoopX + (radius * 3) / 2 - radius / 5,
    hoopY - radius * 3 - radius / 5
  );
  line(
    hoopX + (radius * 3) / 2 + radius / 10,
    hoopY,
    hoopX + (radius * 3) / 2 + radius / 10,
    y_start + radius
  );
  noFill();
  stroke(255);
  strokeWeight(4);
  line(hoopX - (radius * 3) / 2, hoopY, hoopX - radius, hoopY + 3 * radius);
  line(hoopX + radius, hoopY + 3 * radius, hoopX + (radius * 3) / 2, hoopY);
  line(
    hoopX + (radius * 3) / 2,
    hoopY,
    (hoopX - (radius * 3) / 2 + hoopX - radius) / 2,
    hoopY + (radius * 3) / 2
  );
  line(
    hoopX - (radius * 3) / 2,
    hoopY,
    (hoopX + (radius * 3) / 2 + hoopX + radius) / 2,
    hoopY + (radius * 3) / 2
  );
  line(
    (hoopX - (radius * 3) / 2 + hoopX - radius) / 2,
    hoopY + (radius * 3) / 2,
    hoopX + radius,
    hoopY + 3 * radius
  );
  line(
    (hoopX + (radius * 3) / 2 + hoopX + radius) / 2,
    hoopY + (radius * 3) / 2,
    hoopX - radius,
    hoopY + 3 * radius
  );
  stroke(0);
  strokeWeight(1);
  rimX = hoopX - (radius * 3) / 2;
  rimY = hoopY;
  boardX = hoopX + (radius * 3) / 2;
  boardY = hoopY - radius * 3;
  if (shoot === 1) {
    speedY = speedY - g;
    x = x + direction * speedX;
    y = y + speedY;
    if (y > y_start) {
      y = y_start;
      speedY = -speedY * 0.5;
    }
    if (x > 600 - radius) {
      x = 600 - radius;
      speedX = -speedX * 0.5;
    }
    if (x < 0 + radius) {
      x = radius;
      speedX = -speedX * 0.5;
    }
  }

  if ((rimX - x) * (rimX - x) + (rimY - y) * (rimY - y) <= radius * radius) {
    speed = sqrt(speedX * speedX + speedY * speedY);
    speedX = (-speed * (rimX - x)) / radius;
    speedY = (-speed * (rimY - y)) / radius;
    rims += 1;
  }

  if ((hoopY - radius * 3 - radius / 5 < y) & (y < hoopY + radius / 5)) {
    if (
      (x > hoopX + (radius * 3) / 2 - radius / 5 - radius) &
      (x < hoopX + (radius * 3) / 2 + radius * 0.75 - radius / 5) &
      (speedX > 0)
    ) {
      x = hoopX + (radius * 3) / 2 - radius / 5 - radius;
      speedX = -speedX * 0.5;
      bricks += 1;
    }
    if (
      (x > hoopX + (radius * 3) / 2 + radius * 0.75) &
      (x < hoopX + (radius * 3) / 2 + radius * 0.75 + radius - radius / 5) &
      (speedX < 0)
    ) {
      x = hoopX + (radius * 3) / 2 + radius * 0.75 + radius - radius / 5;
      speedX = -speedX * 0.5;
    }
  } else if (
    (boardX - x) * (boardX - x) + (boardY - y) * (boardY - y) <=
    radius * radius
  ) {
    speed = sqrt(speedX * speedX + speedY * speedY);
    speedX = (-speed * (boardX - x)) / radius;
    speedY = (-speed * (boardY - y)) / radius;
    bricks += 1;
  }
  if (
    ((hoopX - x) * (hoopX - x) + (hoopY - y) * (hoopY - y) <=
      0.6 * radius * (0.6 * radius)) &
    (speedY > 0)
  ) {
    shotMade = 1;
    speedX = 0.3 * speedX;
  }
  if (y < -200) {
    skyBall = 1;
  }
  if (
    (bricks > 0) &
    (rims === 0) &
    (y > hoopY) &
    (shotMade === 0) &
    (textDisplay === 0)
  ) {
    textSize(64);
    fill(0);
    strokeWeight(3);
    stroke(255, 0, 0);
    textAlign(CENTER);
    text("Brick!", 300, y_start);
    noFill();
  }
  if (
    (rims === 1) &
    (bricks === 2) &
    (y > hoopY) &
    (shotMade === 0) &
    (textDisplay === 0)
  ) {
    textSize(64);
    fill(0);
    strokeWeight(3);
    stroke(255, 0, 0);
    textAlign(CENTER);
    text("in-and-out", 300, y_start);
    noFill();
  }
  if (rims > 6) {
    speedX = speedX + 0.1;
  }
  if (
    (textDisplay === 0) &
    (bricks === 0) &
    (rims === 0) &
    (speedY > 4) &
    (y < hoopY) &
    (y !== y_start) &
    (shotMade === 0) &
    (x > hoopX + (3 * radius) / 2)
  ) {
    textDisplay = 1;
  }

  if ((textDisplay === 1) & (y > hoopY) & (shotMade === 0)) {
    textSize(64);
    fill(0);
    strokeWeight(3);
    stroke(255, 0, 0);
    textAlign(CENTER);
    text("Air ball!", 300, y_start);
    noFill();
  }
  // Draw the circle last!!!
  fill(230, 105, 0);
  stroke(0);
  strokeWeight(1);
  circle(x, y, radius * 2); // Draws a circle at (x,y,radius)
  noFill();
  if (shotMade === 1) {
    if (scoreCounted === 0) {
      score += 1;
      scoreCounted = 1;
      if (x_start < 75) {
        endText = "Ballin'!";
      }
    }
    stroke(255);
    strokeWeight(4);
    line(hoopX - (radius * 3) / 2, hoopY, hoopX - radius, hoopY + 3 * radius);
    line(hoopX + radius, hoopY + 3 * radius, hoopX + (radius * 3) / 2, hoopY);
    line(
      hoopX + (radius * 3) / 2,
      hoopY,
      (hoopX - (radius * 3) / 2 + hoopX - radius) / 2,
      hoopY + (radius * 3) / 2
    );
    line(
      hoopX - (radius * 3) / 2,
      hoopY,
      (hoopX + (radius * 3) / 2 + hoopX + radius) / 2,
      hoopY + (radius * 3) / 2
    );
    line(
      (hoopX - (radius * 3) / 2 + hoopX - radius) / 2,
      hoopY + (radius * 3) / 2,
      hoopX + radius,
      hoopY + 3 * radius
    );
    line(
      (hoopX + (radius * 3) / 2 + hoopX + radius) / 2,
      hoopY + (radius * 3) / 2,
      hoopX - radius,
      hoopY + 3 * radius
    );
    stroke(0);
    strokeWeight(1);
    textSize(64);
    fill(0);
    strokeWeight(3);
    stroke(255, 255, 0);
    textAlign(CENTER);
    text(endText, 300, y_start);
    noFill();
  }
  stroke(0);
  strokeWeight(4);
  stroke(255, 140, 0);
  arc(hoopX, hoopY, radius * 3, radius / 2, 2 * PI, PI, OPEN);
  stroke(0);
  strokeWeight(1);
}

function Hit_goal() {
  console.log("Hit goal");
  x = x_start;
  y = y_start;
  shoot = 1;
  speedX = (-g * 5 * (174 - x_start)) / 30;
  speedY = (-g * 5 * (44 - y_start)) / 30;
  mouseJustPressed = 0;
  shotMade = 0;
  scoreCounted = 0;
  tries += 1;
  rims = 0;
  bricks = 0;
}

window["Hit_goal"] = Hit_goal();
