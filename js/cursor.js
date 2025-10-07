const FRICTION= 0.1; //mientras más pegado a 1 más rápido, mientras más pegado a 0 más lento
let pos= null;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pos= createVector(mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function update() {
    pos.lerp(createVector(mouseX, mouseY), FRICTION);
}

function draw() {
    update();
    background(255);
    ellipse(pos.x, pos.y, 100, 100);
}   