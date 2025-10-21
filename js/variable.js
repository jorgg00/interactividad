
const input = document.getElementById('wght-slider');
const inputSlant = document.getElementById('slnt-slider');
const title = document.querySelector('h1');



input.addEventListener('input', function() {
    const weigth = input.value;
    console.log(weigth);
    title.style.fontWeight = weigth

});


inputSlant.addEventListener('input', function() {
    const slant = inputSlant.value;
    console.log(slant);
    title.style.fontVariationSettings = "'slnt' " +slant;

});
