var myAsciiArt;

/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
var asciiart_width = 122; var asciiart_height = 64;

var imageAscii;

var dataImage;

var recharge = false;

var gfx;

var ascii_arr;

function preload() {
  imageAscii = loadImage('src/assets/CROPPED-DSC_4999.jpg');
  document.getElementById('ascii-width').value = 122;
  document.getElementById('ascii-height').value = 64;
}

function setup() {
  gfx = createGraphics();
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  convertImage();
}

function convertImage() {
  gfx.background(0);
  gfx.resizeCanvas(asciiart_width, asciiart_height);
  gfx.image(imageAscii, 0, 0, gfx.width, gfx.height);
  gfx.filter(POSTERIZE, 3);
  ascii_arr = myAsciiArt.convert(gfx);

  document.getElementById('image-string').innerHTML = myAsciiArt.convert2dArrayToString(ascii_arr);
}

document.getElementById('file-image').onchange = function() {
  if (this.files && this.files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      dataImage = fr.result;
      recharge = true;
      document.getElementById('image-origin').src = dataImage;
    }
    fr.readAsDataURL(this.files[0]);
  }
}
document.getElementById('ascii-width').onchange = function() {
    recharge = true;
    var value = this.value;
    value = (value<10)?10:value;
    value = (value>200)?200:value;
    asciiart_width = value;
}
document.getElementById('ascii-height').onchange = function() {
  recharge = true;
  var value = this.value;
  value = (value<10)?10:value;
  value = (value>200)?200:value;
  asciiart_height = value;
}
document.getElementById('btn-reloadImage').onclick = function() {
  if (recharge && dataImage) {
    recharge = false;
    loadImage(dataImage,
      img => {
        imageAscii = img;
        dataImage = null;
        convertImage();
      }
      ,
      function () {
        console.log("not load");
      }
    );
  }else if(recharge && imageAscii) {
    convertImage();
  }
}

document.getElementById('copy-code').onclick = function(){
  var copyText = document.getElementById("image-string");
  var str = copyText.innerText;
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

