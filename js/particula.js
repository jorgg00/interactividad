export default class Particula{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(-.5,.5)
        this.size = 10;
        this.color = color(255);
        this.alpha = 255;
        this.life = 100;
    }
    //Procesos
    update(){
        this.pos.add(this.vel);
        this.life--; // Decremento de vida de 1 unidad
        this.alpha = map(this.life,100,0,255,0);
        this.color = color(255, this.alpha);
        this.size = map(this.life,100,0,50,0);
    }

//Salida
 draw() {
   fill(this.color);
   ellipse(this.pos.x,this.pos.y,this.size,this.size);

    }
    
}