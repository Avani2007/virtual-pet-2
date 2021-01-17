
//Create variables here
var dog, happyDog, dogObj ;
var database, foodS, foodStock;
var milkBottleImg, milkBottle, milkBottle2, milkBottle3, milkBottle4, milkBottle5,milkBottle6, milkBottle7, milkBottle8, milkBottle9, milkBottle10, milkBottle11, milkBottle12, milkBottle13, milkBottle14, milkBottle15, milkBottle16, milkBottle17, milkBottle18, milkBottle19,milkBottle20; 
var feed, addFood, lastFed, fedTime, foodObj;
var database;
//var bottles = [milkBottle, milkBottle2, milkBottle3, milkBottle4, milkBottle5,milkBottle6, milkBottle7, milkBottle8, milkBottle9, milkBottle10, milkBottle11, milkBottle12, milkBottle13, milkBottle14, milkBottle15, milkBottle16, milkBottle17, milkBottle18, milkBottle19,milkBottle20]
//var rand = 19;

function preload()
{
  //load images here 
  dog = loadImage("Dog.png")
  happyDog = loadImage("happyDog.png")

}

function setup() {
  createCanvas(600, 500);
  database = firebase.database();
  foodObj = new foodClass()

  dogObj = createSprite(430,350,250,400)
  dogObj.addImage(dog)
  dogObj.scale =0.40;

 feed = createButton("Feed the Dog")
  feed.position(700,95)
  

  addFood = createButton("Add Food")
  addFood.position(800,95)
  

}


function draw() {  
  background(46, 139, 87);

  foodObj.display()
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  feed.mousePressed(feedDog)
  addFood.mousePressed(addFoods)

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FedTime').once("value", function(data){
    lastFed = data.val();
  });
  
textSize(15)
stroke("blue")
fill(255,255,254)
  if (lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30)
} else if (lastFed===0){
    text("Last Feed : 12 AM", 350,30)
}else{
    text("Last Feed : " + lastFed + "AM", 350,30) 
}
 
  //add styles here
  textSize(30)
  stroke("blue")
  fill("Magenta")
 text ("Food left : "+ foodS ,170,100)

 drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){

dogObj.addImage(happyDog)
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )
}
function addFoods(){
  foodS++

database.ref('/').update(
  {
    Food:foodS
  }
)
  

}