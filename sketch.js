//Create variables here
var dog, dog2, database, foodS, foodStock, dog1

function preload()
{
  dog1=loadImage("images/dogImg.png")
  dog2=loadImage("images/dogImg1.png")
	
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-150);
  database = firebase.database();
  foodStock=database.ref("Food").on("value",readStock)

  dog=createSprite(250,250,900,height-50)
  scale(-300)
  dog.addImage(dog1)
  dog.scale=0.5
  
}


function draw() {  
  console.log(foodStock)
  background(46, 139, 87)
  if(keyWentDown(UP_ARROW)){
    dog.addImage(dog2)
    writeStock(foodStock);
  }
  drawSprites();

  //add styles here
  textSize(30)
  fill('black')
  text(foodStock,250,50)

}
function readStock(data){
  foodStock=data.val()
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })

}



