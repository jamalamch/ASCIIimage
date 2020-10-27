var myAsciiArt;

/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
var asciiart_width = 122/2; var asciiart_height = 64/2;

var imageAscii;

var dataImage;

var recharge = false;

var gfx;

var ascii_arr;

function preload() {
  imageAscii = loadImage('src/assets/CROPPED-DSC_4999.jpg',img =>{
      document.getElementById('imageD-width').value = img.width;
      document.getElementById('imageD-height').value = img.height;
  });
  document.getElementById('ascii-width').value = asciiart_width;
  document.getElementById('ascii-height').value = asciiart_height;
  document.getElementById('imageD-name').value = 'myAsciiArt';
  document.getElementById('image-string').style.fontSize = document.getElementById('image-zome').value+"vw"
}

function setup() {
  gfx = createGraphics();
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  convertImage();
  noLoop();
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
document.getElementById('image-zome').onchange = function(){
  var value = this.value;
  document.getElementById('image-string').style.fontSize = value+"vw"
}

function download(text, filename, type) {
  var file = new Blob([text], {type: type});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.setAttribute("download", filename);     
  a.click();
}

document.getElementById('text-file').onclick = function(){
  var copyText = document.getElementById("image-string");
  var str = copyText.innerText;
  download(str,'ASCIICODE.txt', 'text/plain');
}

function hideImageDForm(){
  document.getElementById('id01').style.display='none';
}
function showImageDForm(){
  document.getElementById('id01').style.display='block';
}

document.getElementById('image-file').onclick = function(){
  showImageDForm();
}
document.getElementById('dowload-image').onclick = function(){

  var imageDwidth = document.getElementById('imageD-width').value ;
  var imageDheight = document.getElementById('imageD-height').value ;
  var imageDname = document.getElementById('imageD-name').value;

  img = createGraphics(imageDwidth, imageDheight); 
  img.textAlign(CENTER, CENTER); img.textFont('monospace', 8); img.textStyle(NORMAL);
  img.noStroke(); img.fill(255);
  myAsciiArt.typeArray2d(ascii_arr, img, 0, 0, imageDwidth, imageDheight);
  save(img, imageDname+'.jpg');

  hideImageDForm();
}