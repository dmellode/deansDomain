const context = c.getContext("2d");
const sprite = new Image();

//Sprite Vars
sprite.src = "sprite.png"
let spriteX = 200;
let spriteDY = 0; //Change in y of sprite
let spriteY = 0;
const wait = 24;
const spriteSize = 48;
const screenSize = 400;

//Pipe Vars
let pipeX = 400;
let pipe2X = 0;
const pWidth = 30;
let topGap = Math.floor(Math.random() * 150);
let bottomGap = Math.floor(Math.random() * 150);
let pipeSpeed = Math.floor(Math.random() * 7) + 4;
let pipe2Speed = Math.floor(Math.random() * 7) + 4;

//Score Vars
let score = 0;
let highscore = 0;

//Click to go up
c.onclick = () => (spriteDY = 9)
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        spriteDY = 9;
    }
}

//Redraw Interval (Animation)
setInterval (() => {
    //Setup
    context.fillStyle = "skyblue";
    context.fillRect(0,0, screenSize, screenSize);
    spriteY -= spriteDY -= 0.8; //Add gravity to sprite's y axis
    context.drawImage (sprite, spriteX, spriteY, spriteSize, spriteSize);

    //Pipes
    pipeX -= pipeSpeed;
    pipe2X += pipe2Speed;
    context.fillStyle = "green";
    if (pipeX < -pWidth){ //When pipe goes left off-screen
        topGap = Math.floor(Math.random() * 150);
        pipeSpeed = Math.floor(Math.random() * 7) + 4;
        pipeX = screenSize; //Generate new pipe right-screen
    }
    if (pipe2X > pWidth + screenSize){ //When pipe goes right off-screen
        bottomGap = Math.floor(Math.random() * 150);
        pipeSpeed = Math.floor(Math.random() * 7) + 4;
        pipe2X = 0; //Generate new pipe left screen
    }
    //Drawing pipes
    context.fillRect (pipeX, 0, pWidth, 185-topGap);
    context.fillRect (pipe2X, 215+bottomGap, pWidth, 185);

    //Score
    context.font = "12px Arial" 
    context.fillStyle = "black";
    context.fillText (score++, 9, 25);
    if (highscore < score){
        highscore = score;
    }
    context.fillText (`Best:${highscore}`, 9, 40);

    if (spriteY > screenSize){ //Reset bird to center when it falls off screen
        spriteDY = 0;
        spriteY = 200;
        score = 0;
    }

    //Collisions
    if (pipeX >= spriteX && pipeX < spriteX+pWidth && spriteY < 185-topGap){
        spriteDY = 0;
        spriteY = 200;
        score = 0;
    }
    if (pipe2X >= spriteX && pipe2X < spriteX+pWidth && spriteY > 215+bottomGap){
        spriteDY = 0;
        spriteY = 200;
        score = 0;
    }
}, wait)