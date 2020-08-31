//Create variables here
var dog, dog2, database, foodS, foodStock, dog1, lastFed, fedTime
var addFood,feed,foodObj,renameText,renameButton,dogName

function preload()
{
  dog1=loadImage("images/dogImg.png")
  dog2=loadImage("images/dogImg1.png")
	
}

function setup() {

  createCanvas(displayWidth,displayHeight);
  renameButton=createButton("Rename Dog")
  renameButton.position(width/2-70,height-(height-100))
  renameButton.mousePressed(renameDog)

  foodObj=new Food()

  renameText=createInput("Name")
  renameText.position(width/2-300,height-(height-100))

  feed=createButton("Feed the dog")
  feed.position(width/2-70,height-(height-80))
  feed.mousePressed(feedDog)




  addFood=createButton("Add food")
  addFood.position(width/2+40,height-(height-80))
  addFood.mousePressed(foodAdd)

  database = firebase.database();
  foodStock=database.ref("Food").on("value",readStock)

  dog=createSprite(width-200,height-200,900,height-50)
  //scale(0.4)
  dog.addImage(dog1)
  dog.scale=0.4
  database.ref("Name").on("value",function(data){
    name=data.val()
  })
  
}


function draw() {
  database.ref("LastFed").on("value",function(data){
    lastFed=data.val()
  })



  
  background(46, 139, 87)
  foodObj.display()



  drawSprites();

  //add styles here
  textSize(30)
  fill('black')
  text(foodStock,width/2,height-(height-40))
  textSize(15)
  if(lastFed>12){
    text("Last Time Fed: "+ lastFed%12 +"PM" ,width/2,height/2)
  }
  if(lastFed==0){
    text("Last Time Fed: "+  "12 AM" ,width/2,height/2)
  }
  else{
    text("Last Time Fed: "+  lastFed+" AM" ,width/2,height/2)
  }


  textSize(30)
  text(name,dog.x,height-400)

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
function feedDog(){
  dog.addImage(dog2)
  writeStock(foodStock);

  database.ref("/").update({
    "LastFed":hour()
  })
}
function foodAdd(){
  foodStock++
  database.ref("/").update({
    "LastFed":hour()

  })
  lastFed=hour()
  database.ref("/").update({
    "Food":foodStock
  })
}

function renameDog(){
  database.ref("/").update({
    "Name":renameText.value()

  })
}