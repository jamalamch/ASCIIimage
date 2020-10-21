var myAsciiArt;

/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
var asciiart_width = 122; var asciiart_height = 64;

var imageAscii;

var gfx;

var ascii_arr;

function setup() {
  gfx = createGraphics();
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
}

function convertImage() {
  gfx.background(0);
  gfx.resizeCanvas(asciiart_width, asciiart_height);
  gfx.image(imageAscii, 0, 0, gfx.width, gfx.height);
  gfx.filter(POSTERIZE, 3);
  ascii_arr = myAsciiArt.convert(gfx);

  document.getElementById('image-string').innerHTML = myAsciiArt.convert2dArrayToString(ascii_arr);
}

var dataImage;
var recharge = false;

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
  asciiart_width = document.getElementById('ascii-width').value;
  asciiart_height = document.getElementById('ascii-height').value;
  console.log(asciiart_width+" "+asciiart_height);
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

