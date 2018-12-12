function resetColor()
{
    document.getElementById('red_slider').value = 127
    document.getElementById('green_slider').value = 127
    document.getElementById('blue_slider').value = 127
    document.getElementById('brightness_slider').value = 100
    drawCanvas()
}

function randomColor()
{
    document.getElementById('red_slider').value = Math.floor(Math.random() * 256);
    document.getElementById('green_slider').value = Math.floor(Math.random() * 256);
    document.getElementById('blue_slider').value = Math.floor(Math.random() * 256);
    drawCanvas()
}




//smooth animation? Hægt í byrjun, hratt í miðju.
// -x^(2)+20 Math.pow(speed, 2) + 10 * speed

function move() {
    var sliderValue = [0,0,0];
    
    var Red = document.getElementById('red_slider');
    var Green = document.getElementById('green_slider');
    var Blue = document.getElementById('blue_slider');
    /*Fengu alltaf svipuð gildi ætla prufa aðra aðferð*/

    for (var j = 0; j < 3; j++){
        sliderValue[j] = Math.floor(Math.random() * 256);
    }
    console.log('Áætlað gildi ', sliderValue[0],sliderValue[1],sliderValue[2])
    var ehv = setInterval(frame, 5); // Stýra animation hraða hérna
    
    function frame() {
        for (var i = 0; i < 3; i++){
        if (Red.value == sliderValue[0] && Green.value == sliderValue[1] && Blue.value == sliderValue[2]) {
        clearInterval(ehv);
      } else {
 //Bara breyta gildi ef það er ekki það sama og Random talan 
// Kemur í veg fyrir jitter galla
//Er betri lausn en þessi if-else frumskógur? já...(eftir breytingar) Er þetta betra?
// Er red value ekki jafnt og random gildið? true--> Er gildið minna en random gildið?  true--> gildi++; false -->gildi--;
                Red.value!=sliderValue[0] ? Red.value < sliderValue[0] ? Red.value++ : Red.value--  : console.log("test");
                Green.value!= sliderValue[1] ? Green.value < sliderValue[1] ? Green.value++ : Green.value--  : console.log("test");
                Blue.value!=sliderValue[2] ? Blue.value < sliderValue[2] ? Blue.value++ : Blue.value--  : console.log("test");
                drawCanvas();
        }
      }
    }
}

function drawCanvas(){
    brightness  = parseInt(document.getElementById('brightness_slider').value) / 100
    red = parseInt(document.getElementById('red_slider').value) * brightness
    green = parseInt(document.getElementById('green_slider').value) * brightness
    blue = parseInt(document.getElementById('blue_slider').value) * brightness
    document.getElementById("redT").innerHTML = red.toFixed(0);
    document.getElementById("greenT").innerHTML = green.toFixed(0);
    document.getElementById("blueT").innerHTML = blue.toFixed(0);
    document.getElementById("brightT").innerHTML = (brightness * 100).toFixed(0) + '%';
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, 300, 600); /*Skoða þetta betur kannski? CSS ræður stærð hvort sem er*/
    console.log('Gildi ', red, green, blue, (brightness * 100) + '%')
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fill();
}

/*
jQuery.post( url [, data ] [, success ] [, dataType ] )
https://api.jquery.com/jquery.post/
*/
