function mandelbrot(ctx, height, width, xPos, yPos){

    var imgData = ctx.getImageData(0, 0, width, height);
    var data = imgData.data;

    var h = height;
    var w = width;

    var zoom = 1.5;
    var longer=(w>h)?w:h;
    var shorter=(w<=h)?w:h;
    var dis=(longer-shorter)/2;
    var sym = (yPos == 0);
    for(var i = 0; i < height; i++) {
    	if (sym && i > height/2) break;
        for(var j = 0; j < width; j++) {
            var s = 4 * i * w + 4 * j;
            var x = j - ((h===shorter)?dis:0);
            var y = i - ((w==shorter)?dis:0);
            var c = {
            	x:  2*x*zoom/shorter - zoom + parseFloat(xPos),
            	y: -2*y*zoom/shorter + zoom + parseFloat(yPos)
            }
            var x = iterations(c,1000);
            var red = Math.log(x)*x;
            var green = Math.sqrt(x*x*x*Math.log(x));
            var blue = x;
            data[s] = red //Red
            data[s + 1] = green; //Green
            data[s + 2] = blue; //Blue
            data[s + 3] = 256; //Alpha
             if (sym){
             	var n = 4 * (height - i) * w + 4 * j;
             	data[n] = green; //Red
             	data[n + 1] = blue; //Green
             	data[n + 2] = red; //Blue
             	data[n + 3] = 256; //Alpha
            }
        }

    }
    	ctx.putImageData(imgData, 0, 0);

}
function iterations(c, max){
    var iterations = 0;
    var z = nextZ(c, c);
    if(inTheBrot(c.x,c.y)) return max;
    while (mod2Z(z) < 4 && iterations < max){
        z = nextZ(z, c);
        iterations++;
    }
    return iterations;
}

