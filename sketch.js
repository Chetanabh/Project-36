var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedog ;
var time ;
//create feed and lastFed variable here
var feed , lastFed
var LastFeed ;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedog = createButton("Feed the Dog");
  feedog.position(700,95);
  feedog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
  
}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  //write code to read fedtime value from the database
  time = hour();
  var fetch = database.ref('Lastfed');
  fetch.on("value",(data) =>{
    LastFeed = data.val();
    console.log(LastFeed);
  });

 
 
  //write code to display text lastFed time here
  

  drawSprites();
  fill("red");
  textSize(20);
  
  if(LastFeed>= 12){
    text("Last Feed :  " +LastFeed +" PM",250,50);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",250,50);
  }else {
    text("Last Feed :  " +LastFeed + " AM",250,50);
  }
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  dog.addImage(happyDog);
  
  
  //write code here to update food stock and last fed time
  lastFed = time;
  database.ref('/').update({
    Lastfed: lastFed 
  });
  
  
  foodS-- ;
  database.ref('/').update({
    Food:foodS
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  dog.addImage(sadDog);
}
