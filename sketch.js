var player,plr_img
var enemy,enemyGroup,eimg
var bullet,b_img
var health1,health2,health3,himg
var score=0
var bulletGroup
var asteroid,as_img
var loss=0
var over,oimg


function preload(){
  plr_img=loadImage("aeroplane.jpg")
  eimg=loadImage("alien1.png")
  b_img=loadImage("bullet.png")
  as_img=loadImage("as.png")
  himg=loadImage("life.png")
  oimg=loadImage("gameOver.jpg")

}

function setup() {
  createCanvas(600, 600);
  
  player=createSprite(300,550,20,20)
  player.addImage(plr_img)
  player.scale=0.2

  health1=createSprite(10,20)
  health1.addImage(himg)
  health1.scale=0.1

  health2=createSprite(50,20)
  health2.addImage(himg)
  health2.scale=0.1

  health3=createSprite(90,20)
  health3.addImage(himg)
  health3.scale=0.1
  
  enemyGroup=new Group()
  bulletGroup=new Group()
  
}

function draw() {
  background(0);
  
  if(keyWentDown("right")){
    player.velocityX=7
      
  }
  if(keyWentUp("right")){
    player.velocityX=0
  }
  
  if(keyWentDown("left")){
   player.velocityX=-7
  }
  
  if(keyWentUp("left")){
    player.velocityX=0
  }
  
  fill("red")
  textSize(20)
 // text("HEALTH :-"+health,10,20)
 
  
  text("SCORE:-"+score,480,20)
  
  
  for(var i =0;i<enemyGroup.length;i++){
    if(enemyGroup.get(i).isTouching(player)){
        enemyGroup.get(i).destroy()
        loss+=1
        
        }
  } 
  
enemyGroup.setVelocityYEach(5+score/30)


if(loss===1){
    health3.destroy();
}
if (loss===2){
    health2.destroy();
}
if(loss===3){
    health1.destroy();
    player.destroy();
enemyGroup.destroyEach();
over=createSprite(300,300)
over.addImage(oimg)
bulletGroup.destroyEach()
}
  
  
  displayScore();
  spawnBullets();
  spawnEnemy()
  
  drawSprites();
}


function spawnEnemy(){
  if(frameCount%100===0){
    enemy=createSprite(random(100,550))
    enemy.addImage(eimg)
    enemy.scale=0.09
    enemy.velocityY=3
    enemyGroup.add(enemy)
    enemy.lifetime=200
  }

  
  
  
  if(frameCount%100===0&&score>10){
    asteroid=createSprite(random(50,500))
   asteroid.addImage(as_img)
   asteroid.scale=0.1
   asteroid.velocityY=5
   asteroid.lifetime=200
   enemyGroup.add(asteroid)
  }
  
}

function spawnBullets(){
  
  if(keyDown("space")){
    bullet=createSprite(player.x,player.y)
   bullet.addImage(b_img)
    bullet.scale=0.2
    bullet.velocityY=-7
    bulletGroup.add(bullet)
  }
}
function displayScore(){
  for(var i =0;i<enemyGroup.length;i++){
  if(bulletGroup.isTouching(enemyGroup.get(i))){
     enemyGroup.get(i).destroy();
    bulletGroup.destroyEach();
    score=score+5
}
  }
  
}



