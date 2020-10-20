var myAsciiArt;

/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
var asciiart_width = 122; var asciiart_height = 64;

var imageAscii;

var gfx;

var ascii_arr;

/*
  Let's load the example images first.
*/
function preload() {
  imageAscii = loadImage('src/assets/CROPPED-DSC_4999.jpg');
}

function setup() {
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  convertImage();
}

function convertImage() {
  gfx.image(imageAscii, 0, 0, gfx.width, gfx.height);
  gfx.filter(POSTERIZE, 3);
  ascii_arr = myAsciiArt.convert(gfx);

  document.getElementById('image-string').innerHTML = myAsciiArt.convert2dArrayToString(ascii_arr);
}

var dataImage;
var recharge = false;

document.getElementById('file-image').onchange = function () {
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

function reloadImage() {
  if (recharge && dataImage) {
    recharge = false;
    loadImage(dataImage,
      img => {
        imageAscii = img;
        convertImage()
      }
      ,
      function () {
        console.log("not load");
      }
    );
  }
}

