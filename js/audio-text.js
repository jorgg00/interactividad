import SRTLector from './srt-reader.js'

let font, fontSize;
let song, fft, smoothing = 0.9, binSize = 128;
let amplitude = 0;
let audioSRTReader;

window.preload = () => {

    font = loadFont("../css/rubik.ttf");
    song = loadSound("../audio/crush.mp3")
    console.log(song);
    audioSRTReader = new SRTLector(song, '/subtitles.srt', {
        onSubtitleChange: (obj, currentTime) => {
            // Solo actualizar si el audio está reproduciéndose
            if (song.isPlaying()) {
                console.log(obj.subtitle, currentTime)
            }
            console.log("update");
        }
    })
}

window.setup = () => {

    let canvas = createCanvas(windowWidth, windowHeight);

    textFont(font);
    textSize(100);
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
}

window.draw = () => {

    // let spectrum = fft.analyze();
    let vol = amplitude.getLevel();
    // console.log(vol);

    background(int(vol * 255));
    translate(0, windowHeight / 2 - (fontSize * 2));
    fill(255 - int(vol * 255));
    text("I GOT A CRUSH", windowWidth / 2, 0);
    fill(255 - int(vol * 255));
    text("CAN'T GET ENOUGH", windowWidth / 2, fontSize * 1);
    fill(255 - int(vol * 255));
    text("YOU TOLD ME HUSH", windowWidth / 2, fontSize * 2);
    const red = 255 - int(vol * 255);
    const green = 0;
    const blue = 255 - int(vol * 255);
    fill(red, green, blue);
    text("OH, WHAT A RUSH", windowWidth / 2, fontSize * 3);

    const spectrum = fft.analyze();
    const invertedSpectrum = spectrum.slice().reverse();
    const values = invertedSpectrum.concat(spectrum);
    beginShape();
    curveVertex(0, height / 2);
    for (let i = 0; i < values.length; i++) {
        const x = map(i, 0, values.length, 0, width);
        let yOffset = map(values[i], 0, 255, 0, height / 4);
        if (i % 2 == 0) yOffset *= -1;
        curveVertex(x, yOffset + height / 2);
    }
    curveVertex(width, height / 2);
    endShape();



}

