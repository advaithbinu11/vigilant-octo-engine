var bob, hiimage, alienYellowWalkImage, alienYellowWalkLeftImage, arrowImage;
var knifeImage, bobJumpImage;
var bobWalkImage, bobWalkLeftImage, bobDeadImage, bobDuckLeftImage;
var doorImage, guardStopImage, youWinImage
var outback, winsound, losingsound;
var soundnum;
var gameState;
var guard, guardnum = 0, downnum = 0;
var cdividedd;
//Width:1366
//Height:768
function preload() {
  hiimage = loadAnimation("BobSaysHi.png")
  bobWalkImage = loadAnimation("alien1.png", "alien2.png");
  bobWalkLeftImage = loadAnimation("alien1copy.png", "alien2copy.png")
  alienYellowWalkImage = loadImage("yellowalien.png");
  alienYellowWalkLeftImage = loadImage("yellowalienleft.png")
  doorImage = loadImage("door.png")
  knifeImage = loadImage("knife1.png")
  bobDeadImage = loadAnimation("bobDead.png")
  bobDuckImage = loadAnimation("bobduck.png")
  bobDuckLeftImage = loadAnimation("bobduckleft.png")
  youWinImage = loadImage("You Win.png")
  outback = loadSound("outback.mp3")
  winsound = loadSound("puzzle_game_achievement_02.mp3")
  losingsound = loadSound("mission_failed_male.mp3")
}
//Width:1366,ratio:3.415
//Height:656,ratio:1.64
function setup() {
  createCanvas(displayWidth, displayHeight-112);
  bob = createSprite(68*3.415, 336*1.92);
  bob.debug = true
  bob.scale = 0.8*2
  bob.addAnimation("bobright", bobWalkImage);
  bob.addAnimation("bobleft", bobWalkLeftImage);
  bob.addAnimation("bobdead", bobDeadImage);
  bob.addAnimation("bobduck", bobDuckImage);
  bob.addAnimation("bobduckleft", bobDuckLeftImage);
  bob.addAnimation("bobjump", hiimage);
  bob.x = 58*3.415+200
  bob.y = 80*1.92-50
  guard = createSprite(202*3.415+300, bob.y, 50*3.415, 50*1.92);
  guard.addImage("alien", alienYellowWalkImage);
  guard.scale = 2
  gameState = "intro";
  outback.play()
}
//Width:1366,ratio:3.415
//Height:656,ratio:1.64

function draw() {
  if (gameState === "intro") {
    background(25, 255, 0);
    textSize(30);
    fill(196, 56, 194)
    text("Hi, my name is Bob. I was kidnapped by the evil yellow aliens.", 300, 250);
    text(" Help me escape!", 600, 310);
    text("The space bar is for jumping.", 515, 370);
    text("The joystick is for walking but the bottom make me duck.", 300, 430);
    text("Press the yellow button to continue", 515, 500);
    text("Go through the door to win! If I die, press the yellow button to restart", 300, 570);
  }
  if (gameState == "intro" && keyDown("space")) {
    gameState = "play";
    guard.x = 30*3.415;
    guard.y = 352*1.64;
    bob.x = 58*3.415;
    bob.y = 80*1.64;
  }
  //Width:1366,ratio:3.415
//Height:656,ratio:1.64
  if (gameState === "lose" && keyDown("space")) {
    gameState = "play";
    bob.x = 58*3.415;
    bob.y = 80*1.64;
  }
  if (gameState === "play") {
    console.log(bob.y)
    background(72, 61, 139);
    var wall1 = createSprite(150*3.415, 148*1.64, 380*3.415, 40*1.64);
    var wall2 = createSprite(250*3.415, 268*1.64, 380*3.415, 40*1.64);
    var wall3 = createSprite(200*3.415, 400*1.64, 400*3.415, 10*1.64);
    var sword1 = createSprite(250*3.415, 148*1.64);
    var door = createSprite(150*3.415, 342*1.64);
    var sword2 = createSprite(120*3.415, 148*1.64);
    door.addImage(doorImage);
    door.scale = 2.5;
    sword1.scale = 1.2;
    sword1.debug = true
    sword2.debug = true
    sword1.addImage(knifeImage);
    sword1.setCollider("rectangle", 0, 0, 60, 100);
    sword2.setCollider("rectangle", 0, 0, 60, 100);
    sword2.scale = 1.2;
    sword2.addImage(knifeImage);
    if (keyDown("space")) {
      bob.changeAnimation("bobjump", hiimage);
      downnum = 0;
      bob.scale = 1.6
      bob.velocityY = -10;
    }
    if (bob.isTouching(sword1) || bob.isTouching(sword2) || bob.isTouching(guard)) {
      bob.velocityX = 0;
      bob.velocityY = 0;
      losingsound.play()
      gameState = "lose";
    }
    //gravity
    bob.velocityY = bob.velocityY + 0.8;
    bob.collide(wall1)
    bob.collide(wall2)
    bob.collide(wall3)
    if (keyDown("left") && downnum === 0) {
      bob.x = bob.x - 5;
      bob.changeAnimation("bobleft", bobWalkLeftImage)
    }
    if (keyDown("right") && downnum === 0) {
      bob.x = bob.x + 5;
      bob.changeAnimation("bobright", bobWalkImage);
    }
    if (keyDown("left") && downnum === 1) {
      bob.x = bob.x - 5;
      bob.changeAnimation("bobduckleft", bobDuckLeftImage);
    }
    if (keyDown("right") && downnum === 1) {
      bob.x = bob.x + 5;
      bob.changeAnimation("bobduck", bobDuckImage);
    }
    if (keyDown("down")) {
      bob.changeAnimation("bobduck", bobDuckImage);
      bob.scale = 0.9
      downnum = 1;
    }
    if (guardnum === 0) {
      guard.velocityX = 2;
      guard.addImage(alienYellowWalkImage);
    }
    if (guardnum === 1) {
      guard.velocityX = -2;
      guard.addImage(alienYellowWalkLeftImage);
    }
    if (guard.x === 390) {
      guardnum = 1;
    }
    if (guard.x === 10) {
      guardnum = 0;
    }
    if (bob.isTouching(door)) {
      outback.stop();
      winsound.play();
      gameState = "Win!";
      bob.destroy();
      guard.velocityX = 0;
      var win = createSprite(200*3.415, 200*1.64);
      win.scale = 2
      win.addImage(youWinImage);
    }
  }
  if (gameState === "lose") {
    background(72, 61, 139);
    bob.changeAnimation("bobdead", bobDeadImage);
    guard.addImage(alienYellowWalkImage);
    guard.velocityX = 0;

  }
  drawSprites();
}
