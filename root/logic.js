
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.height = 300;
ctx.canvas.width = 1200;

const status = document.querySelector(".status");
const tryAgain = document.querySelector(".try-again");

// Attributes of the player
let player = {
    x: 120,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump : false,
    height: 20,
    width: 20,
    };

// The status of the arrow keys    
let keys = {
    right: false,
    left: false,
    up: false,
    };

// The gravity to show realistic movements    
let gravity = 0.6;

// The platforms
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

let finalPlatform = platforms[platforms.length-1];

// Function to render the canvas
function rendercanvas(){
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Function to render the player
function renderplayer(){
    ctx.fillStyle = "#F08080";
    ctx.fillRect((player.x)-10, (player.y)-20, player.width, player.height);
}

// Function to render platforms
function renderplat(){
    ctx.fillStyle = "blue";
    for(let i= 0; i<platforms.length; i++){
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
    ctx.fillStyle = "pink";
    ctx.fillRect(finalPlatform.x, finalPlatform.y, finalPlatform.width, finalPlatform.height);
}

// This function is called when one of the arrow keys is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode === 37) {
        keys.left = true;
    }
    // 38 is the code for the up arrow key
    if(e.keyCode === 38) {
        if(player.jump === false){
            player.y_v = -10;
        }
        player.jump = true
        
    }
    // 39 is the code for the right arrow key
    if(e.keyCode === 39) {
        keys.right = true;
    }
}

// This function is called when the key is released
function keyup(e) {
    if(e.keyCode === 37) {
        keys.left = false;
    }
    if(e.keyCode === 38) { 
        if(player.y_v < -2) {     
            player.y_v = -1;      // if jump is released quickly the jump will be shorter.
        }
    }
    if(e.keyCode === 39) {
        keys.right = false;
    }
}

document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);

let slide = 2; // sets the speed of the moving platform. 

function loop() {
    // If the player is jumping apply the effect of gravity
    if(player.jump === true){ 
        player.y_v += gravity;
    } 

    // If the left key is pressed, move the player to the left
    if(keys.left) {
        player.x_v = -2.5;
    } 
    
     // If the right key is pressed, move the player to the right
    else if(keys.right) {
        player.x_v  = 2.5;
    } else {
        player.x_v = 0;
    }

    // code to make platform 3 move
    platforms[3].x += slide;
     
    if(platforms[3].x >= 800 || platforms[3].x <= 520){
        slide = -slide;
    }
    
    if((platforms[3].x <= (player.x+(player.width/2)-1)) && ((player.x-(player.width/2)+1) < platforms[3].x + platforms[3].width) && (player.y === platforms[3].y)){
        player.x_v += slide;
    } 
    
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    
    
    // Code that checks for collisions with at least one platform
    let j = 0;
    for(let i =0; i<platforms.length; i++){
        if((platforms[i].x <= (player.x+(player.width/2)-1)) && ((player.x-(player.width/2)+1) < platforms[i].x + platforms[i].width) && (player.y >= platforms[i].y) && (player.y <= platforms[i].y + platforms[i].height)){   
            j += platforms.length;
            player.y = platforms[i].y;
            player.jump = false;
            player.y_v = 0; 
        }   
        else { j -=1
        } 
        if (j < 0){
            player.jump = true;
        }           
    }

    
    // check for game over or victory

    if(player.y > canvas.height + player.height){           // (if the player has fallen off the screen) 
        status.innerHTML = "Game Over";
        tryAgain.classList.toggle("hidden");
        clearInterval(gameLoop); 
    }

    if((finalPlatform.x <= (player.x+(player.width/2)-1)) && ((player.x-(player.width/2)+1) < finalPlatform.x + finalPlatform.width) && (player.y === finalPlatform.y)){
        status.innerHTML = "Well Done!";
        clearInterval(gameLoop);
    }
    
    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat();
}

let gameLoop = setInterval(loop, 20);
// Calling loop every 20 milliseconds to update the frame

tryAgain.addEventListener("click",function(){
    status.innerHTML = "";
    tryAgain.classList.toggle("hidden");
    player.x = 120;
    player.y = 150;
    player.y_v = 0;
    jump = true;
    gameLoop = setInterval(loop,20);
});

gameLoop;

