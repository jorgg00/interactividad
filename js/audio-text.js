import SRTLector from './srt-reader.js'

let font, fontSize;
let song, fft, smoothing = 0.9, binSize = 128;
let amplitude = 0;
let audioSRTReader;
let currentsubtitle = "";
let center= {x:1, y:1}
let diameter = 100;
let vol = 0;
var t;

window.preload = () => {

    font = loadFont("../css/rubik.ttf");
    song = loadSound("../audio/crush.mp3")
    console.log(song);
    audioSRTReader = new SRTLector(song, '/subtitles.srt', {
        onSubtitleChange: (obj, currentTime) => {
            // Solo actualizar si el audio está reproduciéndose
            if (song.isPlaying()) {
                currentsubtitle = obj.subtitle

             
            }
            
        }
    })
}

window.setup = () => {

    let canvas = createCanvas(windowWidth, windowHeight);

    diameter= max(width,height);

    textFont(font);
    textAlign(CENTER, CENTER);
    windowResized();
    amplitude = new p5.Amplitude();
    canvas.mousePressed(() => {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.play();
        }
    });

    fft = new p5.FFT(smoothing, binSize);
    fft.setInput(song);

}

window.windowResized = () => {

    fontSize = windowWidth / 11;
    resizeCanvas(windowWidth, windowHeight);
    textSize(fontSize);
    diameter= max(windowWidth,windowHeight);
   center= {x:width/2, y:height/2}
}
window.drawText =() =>{
    noStroke();
    fill(255 - int(vol * 255));
    text(String(currentsubtitle).toUpperCase(),center.x,center.y);
}

window.draw = () => {

    // let spectrum = fft.analyze();
   vol = amplitude.getLevel();
    // console.log(vol);

    background(int(vol * 255), 30);
    drawText();
    
    stroke(255,0,0);
    noFill();
    
    translate(center.x, center.y);
    beginShape();
    for (var i = 0; i < 200; i++) {
      var ang = map(i, 10, 100, 0, TWO_PI);
      var rad = (vol*(abs(sin(i)*200)+80))*(8) * noise(i * 0.03, frameCount * 0.006);
      var x = rad * cos(ang);
      var y = rad * sin(ang);
      curveVertex(x, y);
    }
    endShape();

    stroke(255,0,0);
    noFill();

    translate(center.x+1, center.y+1);
    beginShape();
    for (var i = 0; i < 200; i++) {
      var ang = map(i, 10, 100, 0, TWO_PI);
      var rad = 200 * noise(i * 0.01, frameCount * 0.005);
      var x = rad * cos(ang);
      var y = rad * sin(ang);
      curveVertex(x, y);
    }
    endShape();
    
  
   
    


}

