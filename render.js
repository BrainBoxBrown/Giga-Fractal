var _canvas;
var _width;
var _height;
var _xPos;
var _yPos;
var shouldStop = true;

var render = _.debounce(function (canvas, width, height, xPos, yPos){


    if (typeof xPos   !== 'number' ||
        typeof yPos   !== 'number' ||
        typeof width  !== 'number' ||
        typeof height !== 'number'
        ){
        return;
    }
    console.log("Rendering Image")

    _canvas = canvas;
    _width = width;
    _height = height; 
    _xPos = xPos;
    _yPos = yPos;
    _stop = stop;
    var ctx = canvas.getContext("2d");

    var imgData = ctx.getImageData(0, 0, width, height);
    var data = imgData.data;

    var h = height;
    var w = width;

//Clean the view
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            var s = 4 * i * w + 4 * j;
            var x = 10;
            data[s] = x; //Red
            data[s + 1] = x; //Green
            data[s + 2] = x; //Blue
            data[s + 3] = 256; //Alpha
        }

    }
    ctx.putImageData(imgData, 0, 0);
    iteration();






}, 600, { leading: false })



function iteration() {

     if (!shouldStop) {
        console.log("Updating")

        var ctx = _canvas.getContext("2d");
        var imgData = ctx.getImageData(0, 0, _width, _height);
        buddhabrot(imgData, _height, _width, _xPos, _yPos);
        ctx.putImageData(imgData, 0, 0);
    }else{
        console.log("Waiting")
    }

    window.setTimeout(iteration, 0);
  
}

function stopStart() {
        console.log("Changing")
   shouldStop = !shouldStop;
}

function nextZ(z,c){
        var temp = z.y;
        y = 2*z.y*z.x + c.y;
        x = z.x*z.x - temp*temp + c.x;
        return {
            x: x,
            y: y
        };
}

function mod2Z(z){
    return z.x*z.x + z.y*z.y;
}

function inTheBrot(x, y){
    var p = Math.sqrt((x-1/4.0)*(x-1/4.0) + y*y);
    var cardioid = (x < p-2*p*p + 1/4.0);
    var c1 = (x+1)*(x+1) + y*y < 1/16;
    return c1 && cardioid;
}