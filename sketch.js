var potionImages = [];
var gameSound;
var catchSound;
var missNoise;
var oopsNoise;
var gameoverNoise;
var score = 0;
var timer = 4;
var frame = 0;
var gameState = "playing";

function preload() {
  for (let i = 0; i < 9; i++) {
    potionImages[i] = loadImage(`./images/potions_000${i}_bottle${i + 1}.png`);
  }
  gameoverNoise = loadSound('./sound/end.wav');
  gameSound = loadSound('./sound/gameloop.wav');
  missNoise = loadSound('./sound/miss.wav');
  catchSound = loadSound('./sound/collect.wav');
  oopsNoise = loadSound('./sound/start.m4a');
  gameSound.setVolume(.6);
  catchSound.setVolume(.4);
  gameoverNoise.setVolume(0.4);
}

function setup() {
  createCanvas(800, 650);
  gameSound.loop();
  oopsNoise.play();
}

function draw() {
  background(180, 230, 255);
  textAlign(CENTER);
  switch (gameState) {
    case "playing":
      frame++;
      if (frame >= 60) {
        if (timer > 0) {
          timer--;
          frame = 0;
        } else {
          gameState = 'end';
          gameoverNoise.play();
        }
      }
      if (random(80 - score * 1.2) < 1) {
        createPotion(random(30, width - 30), -20);
      }
      break;
    case "end":
      textSize(100);
      text('GAMEOVER', width/2, height/2);
      gameSound.stop();
  }
  textSize(30);
  text("POINTS", 80, 60);
  text("TIMER", width - 100, 60);
  textSize(50);
  text(score, 55, 120);
  text(timer, width - 105, 120);

  drawSprites();
}

function createPotion(x, y) {
  var potion = createSprite(x, y);
  potion.addImage(potionImages[floor(random(0, 9))]);
  potion.scale = 0.05;
  potion.velocity.y = random(1 + score * 0.2, 1.5 + score * 0.2);
  potion.onMousePressed = potionHit;
}

function potionHit(potion) {
  if (gameState == 'playing') {
    potion.remove();
    catchSound.play();
    score++;
  }
}
