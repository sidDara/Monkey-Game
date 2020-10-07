//variables for the gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//variables for the different parts of the game
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var score
var survivalTime = 0;

function preload(){
  
  //loads the images and animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,400)
 
  //creates the sprites for the monkey and gives it the animation
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  
  //creates the ground sprite
  ground = createSprite(400,350,1200,10)
  ground.x = ground.width/2
  console.log(ground.x)
  
  //creates the groups for the obstacles and food
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  monkey.debug = true

}


function draw() {
  //clears the background 
  background("skyBlue")
  
  //displays the survival time
  stroke("black")
  textSize(13)
  fill("black")
  text("SURVIVAL TIME: "+ survivalTime, 430, 20);
  
  //if gamestate is play do this... 
  if (gameState === PLAY) {
    survivalTime = survivalTime + Math.round(getFrameRate()/45);
    
    console.log(monkey.y)
    ground.velocityX = -4
    
    if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 314){
    monkey.velocityY=-13;
  }
   
    monkey.velocityY = monkey.velocityY+1
    
    food();
    obstacles();
 
  if(obstaclesGroup.isTouching(monkey)){
   gameState = END; 
    }
}
  
  //if gamestate is end, do this ...
  else if (gameState === END){
    text("GAME OVER", 250, 200);
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    foodGroup.setVelocityXEach(0)
    monkey.velocityY = 0
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
 
  
    
}
  
  monkey.collide(ground); 
  drawSprites();
  
}

//function for the food.
function food()
{
  if(frameCount%80===0)
  {
    banana = createSprite(400);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-7;
    banana.lifetime=200;
    banana.depth = monkey.depth
    monkey.depth = monkey.depth+1
    foodGroup.add(banana);
    
  }
}

//fucntion for the obstacles.
function obstacles()
{ 
  if(frameCount%300===0)
  {
    obstacle = createSprite(400,322);             
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX = -(6 + score/100);
    obstacle.velocityX=-7;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle)
  }
}






