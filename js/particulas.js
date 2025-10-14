import Particula from './particula.js'

let p = null



window.setup = function(){
p= new Particula(createVector(windowWidth/2,windowHeight/2));
    createCanvas(windowWidth, windowHeight)
}
window.draw = function (){
    background(0);
    p.update();
    p.draw();
}