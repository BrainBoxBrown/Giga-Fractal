
var maxIterations = 1000;
var zoom = 3;

function buddhabrot(imgData, height, width, xPos, yPos){
	// mandelbrot(ctx, height, width, xPos, yPos);
    // var imgData = ctx.getImageData(0, 0, width, height);
    var data = imgData.data;

    var h = height;
    var w = width;

    var longer=(w>h)?w:h;
    var shorter=(w<=h)?w:h;
    var dis=(longer-shorter)/2;
    var sym = (yPos==0);
    var numPoints = 100;
    var ppsl = 1;
    var squareLen = 0.001;
    var boxing = true;
    var c = {
        x: 0,
        y: 0
    }
    var p = []; 


    for (var i = 0; i < numPoints; i++) {
    	 do{
    		c.x = 4*(Math.random() - 0.5);
    		c.y = 4*(Math.random() - 0.5);
    		p = path(c,maxIterations);
    		//p == [] means the intheBrot function has returned true
    	 }while((p.length == 0 || p.length >= maxIterations) );
        var dis = ppsl/squareLen;
        
        if (boxing){
            //Make a square starting with p in the top left
            for (var a = 1; a < ppsl; a++) {
                for (var b = 0; b < ppsl; b++) {
                    var newPoint = {
                    x:a*dis + p[0].x,
                    y:b*dis + p[0].y
                    }
                    var newPath = path(newPoint);
                    //If it should be written
                    if (newPath.length != 0 && newPath.length < maxIterations){
                        writeToData(data, newPath, h, w, xPos, yPos, i);
                    }
                }
            }
        }
        
        //Write the initial point
        writeToData(data,p, h, w, xPos, yPos, i);
        
    }

    //ctx.putImageData(imgData, 0, 0);


}

function writeToData(data, p, h, w, xPos, yPos, i){
    var iter = p.length;
        while(p.length > 0){
        var z = p.shift();
        var t = {
    	 		x: (((z.x-xPos)*w)/zoom)+w/2,
    	 		y: (((z.y-yPos)*w)/zoom)+w/2
            // x: (((z.x - xPos + zoom)/2*zoom)*w),// + ((h===shorter)?dis:0)),
            // y: (((z.y - yPos - zoom)/(-2*zoom))*w)// + ((h===shorter)?dis:0))
        }
        
        if (Math.floor(t.y) > h 	||
            Math.floor(t.y) < 0 	||
            Math.floor(t.x) > w 	||
            Math.floor(t.x) < 0){
            continue;
        }
        
        
        var s = 4 * Math.floor(t.y) * w + 4 * Math.floor(t.x);
        var ds = data[s];
        var x = (1-ds/256);
        var f1 = (iter/maxIterations);
        var f2 = (10/(iter + 10));
        var f3 = (f1/(f2*50));
        data[s] += x*(f3 + f1); //Red
        data[s + 1] += x*(f3); //Green
        data[s + 2] += x*f2; //Blue
        data[s + 3] = 256; //Alpha
        
        //Rainbow!!
        if (iter > 3*maxIterations/4){
            data[s + i%3] += x*(f3)*(i%7 + 1); //Red
            data[s + (1+i%3)%3] += x*(i%11 + 1); //Green
            data[s + (2+i%3)%3] += x*f2*(i%13 + 1); //Blue
        }
        
        //It's allways going to be symetrical
        var n = 4 * (h - Math.floor(t.y)) * w + 4 * Math.floor(t.x);
        var k = x/2;
        data[n]     += k; //Red
        data[n + 1] += k; //Green
        data[n + 2] += k*(f1/(f2*70)); //Blue
        data[n + 3] = 256; //Alpha
        
    }

}

function path(c, max){
    var points = [c];
    var z = nextZ(c,c);
    if(inTheBrot(c.x,c.y)) return [];
    while (mod2Z(z) < 4 && points.length < max){
        z = nextZ(z, c);
        points.push(z);
    }
    return points;
}
