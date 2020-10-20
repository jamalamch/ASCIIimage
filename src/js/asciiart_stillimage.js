var myAsciiArt;

/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
var asciiart_width = 122; var asciiart_height = 64;

var images ;

var gfx;

var ascii_arr;

var cyclic_t;
/*
  Let's load the example images first.
*/
function preload() {
  images = loadImage('src/assets/CROPPED-DSC_4999.jpg');
}

function setup() {
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  myAsciiArt.printWeightTable();
  gfx.image(images, 0, 0, gfx.width, gfx.height);
  gfx.filter(POSTERIZE, 3);
  ascii_arr = myAsciiArt.convert(gfx);
  putTextImage();
}
function putTextImage(){
  document.getElementById('image-string').innerHTML=myAsciiArt.convert2dArrayToString(ascii_arr);
}


function mouseReleased() {
  console.log(myAsciiArt.convert2dArrayToString(ascii_arr));
}

