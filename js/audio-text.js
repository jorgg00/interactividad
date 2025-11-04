
let font,fontSize;
let song;

function preload() {
    font = loadFont("../css/rubik.ttf");
    song = loadSound("../audio/crush.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(font);
    textSize(100);
    textAlign(CENTER, CENTER);
    windowResized();
   
    
   
}

function windowResized(){
    fontSize = windowWidth/11;
    resizeCanvas(windowWidth, windowHeight);
    textSize(fontSize);
}

function draw(){
    background("#F2D544");
    text("I GOT A CRUSH", windowWidth/2, windowHeight/2);
    text("CAN'T GET ENOUGH", windowWidth/2, windowHeight/2+fontSize*1);
    text("YOU TOLD ME HUSH", windowWidth/2, windowHeight/2+fontSize*2);
    text("OH, WHAT A RUSH", windowWidth/2, windowHeight/2+fontSize*3);


}

