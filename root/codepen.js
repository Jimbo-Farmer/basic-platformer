const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); 
ctx.canvas.height = 300;
ctx.canvas.width = 1200;

// ctx constant tells us that we're drawing in 2D, which comes with a set of methods we can call for drawing, such as rectangles, arc, lines etc
// We've set the canvas width and height, but now we need to fill it in by drawing a rectangle

function renderBackground(){
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// No equals on fillRect.

renderBackground();  // we will move this later, as we want the canvas to be redrawn every frame. 

let platforms = [{
    x: 100,
    y: 200,
    width: 110,
    height: 15
    },
    {
    x: 250,
    y: 200,
    width: 110,
    height: 15
    },
    {
    x: 400,
    y: 150,
    width: 110,
    height: 15
    },
    {   // this has been turned into a moving platform. 
    x: 520,
    y: 150,
    width: 110,
    height: 15
    },
    {
    x: 930,
    y: 100,
    width: 100,
    height: 15   
    }
];

function renderPlatforms(){
  for(let i= 0; i < platforms.length; i++){
    ctx.fillStyle = "blue";
  ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height)
  }
}
renderPlatforms() // we will also move this



let player = {
  x: 120,
  y: 200,
  height: 20,
  width: 20,
  x_v: 0,
  y_v: 0,
  jump: false,
};

function renderPlayer(){
  ctx.fillStyle = "red";
  ctx.fillRect(player.x - 10, player.y - player.height, player.width, player.height)
}
renderPlayer(); // we will also move this


// next we need to control the player, using left, right and up keys

let keys = {
    right: false,
    left: false,
    up: false,
};

let gravity = 0.6;

function keydown(e){
  if(e.keyCode === 37){
    keys.left = true;
  }
  if(e.keyCode === 39){
    keys.right = true;
  }
  if(e.keyCode === 38){
    if(player.jump === false){
      player.y_v = -10;
    }
    player.jump = true;
  }
}

function keyup(e){
  if(e.keyCode === 37){
    keys.left = false
  }
  if(e.keyCode === 39){
    keys.right = false
  }
  if(e.keyCode === 38){
    if(player.y_v < -2){
      player.y_v = -1;
    }
  }
}

document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);


function loop(){
    if(player.jump){
        player.y_v += gravity;
    }


    if (keys.left) {
          player.x_v = -2.5;
      }  else if (keys.right) {
          player.x_v  = 2.5;
      }  else {
        player.x_v = 0;
    }

    // do platform here, switch to logic file. 

    player.y += player.y_v;
    player.x += player.x_v;
    
    renderCanvas();
    renderPlatforms();
    renderPlayer();
  }
  
  let gameLoop = setInterval(loop, 20);
  
  gameLoop;


