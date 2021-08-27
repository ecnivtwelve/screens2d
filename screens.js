/*
                                  ____     _ 
 ___  ___ _ __ ___  ___ _ __  ___|___ \ __| |
/ __|/ __| '__/ _ \/ _ \ '_ \/ __| __) / _` |
\__ \ (__| | |  __/  __/ | | \__ \/ __/ (_| |
|___/\___|_|  \___|\___|_| |_|___/_____\__,_|
Create all types of Javascript graphical content with style.
Made by ecnivtwelve (https://github.com/ecnivtwelve)

Credits :
Juan Mendes for the rounded rectangles (https://stackoverflow.com/a/3368118)
*/

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
 function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
  }

// setting objects
let screens2d = new Object();
screens2d.canvas = new Object();

//setting variables
screens2d.canvas.draw;
screens2d.canvas.element;
screens2d.canvas.lastObjectX;
screens2d.canvas.lastObjectY;
screens2d.canvas.isFull = false;

// screen2d.canvas
screens2d.canvas.init = function(id, args) {
    var canvas = document.getElementById(id);

    canvas.style.border = "1px solid #555";

    screens2d.canvas.element = id;
    var ctx = canvas.getContext('2d');
    screens2d.canvas.draw = ctx;

    if (typeof args !== 'undefined') {
        if(args.includes("full")){
            canvas.style.position = "absolute"
            canvas.style.border = "none"
            canvas.style.top = 0;
            canvas.style.left = 0;
            ctx.canvas.width  = window.innerWidth;
            ctx.canvas.height = window.innerHeight;    
            screens2d.canvas.isFull = true;       
        }
    }   
}

function setSpecialX(x) {
    if(x == "last") {
        return screens2d.canvas.lastObjectX;
    }
    else {
        return x;
    }
}

function setSpecialY(y) {
    if(y == "last") {
        return screens2d.canvas.lastObjectY;
    }
    else {
        return y;
    }
}

screens2d.canvas.text = function(x, y, font, size, text, color) {
    var finalX = setSpecialX(x)
    var finalY = setSpecialY(y)

    screens2d.canvas.draw.fillStyle = color;
    screens2d.canvas.draw.font = size+" "+font;
    screens2d.canvas.draw.fillText(text, finalX, finalY); 

    screens2d.canvas.lastObjectX = x;
    screens2d.canvas.lastObjectY = y;
}

screens2d.canvas.rect = function(x, y, lo, la, round, color) {
    var finalX = setSpecialX(x)
    var finalY = setSpecialY(y)

    if(lo == "full") {
        lo = document.querySelector("#"+screens2d.canvas.element).clientWidth;
        x = 0;
    }
    if(la == "full") {
        la = document.querySelector("#"+screens2d.canvas.element).height;
        y = 0;
    }

    screens2d.canvas.draw.strokeStyle = color;
    screens2d.canvas.draw.fillStyle = color;
    
    roundRect(screens2d.canvas.draw, finalX, finalY, lo, la, round, true);

    screens2d.canvas.lastObjectX = x;
    screens2d.canvas.lastObjectY = y;
}

screens2d.canvas.image = function(x, y, img, width, height) {
    var finalX = setSpecialX(x)
    var finalY = setSpecialY(y)

    var myImage = new Image();
    myImage.addEventListener('load', function() {
        screens2d.canvas.draw.drawImage(myImage, finalX, finalY, width, height)
      }, false);
    myImage.src = img;
}

screens2d.canvas.reset = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
//

// setting objects
screens2d.screen = new Object();

//setting variables
screens2d.screen.currentScreen;
screens2d.screen.currentZIndex = 1;

// screen2d.screen
screens2d.initScreen = function(screen) {
    document.getElementById(screen).style.zIndex = screens2d.screen.currentZIndex = 1;
    screens2d.screen.currentZIndex = screens2d.screen.currentZIndex + 1;
    if(screens2d.screen.currentZIndex = 2) {
        document.getElementById(screen).style.display = "flex";
        screens2d.screen.currentScreen = screen;
    }
    else {
        document.getElementById(screens).style.display = "none";
    }
}

screens2d.showScreen = function(screen) {
    document.getElementById(screens2d.screen.currentScreen).style.display = "none";
    screens2d.screen.currentScreen = screen;
    document.getElementById(screens).style.display = "flex";
}