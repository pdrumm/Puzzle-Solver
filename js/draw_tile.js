/**
 * Created by Kris on 2/24/2016.
 */
function drawTile(tile, frameHeight, i, topOffset, leftOffset) {
    console.log(tile);
    //var colors = ['red', 'blue', 'green', 'yellow'];
    var body = document.getElementsByTagName("body")[0];
    var canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    canvas.style.position = "absolute";
    canvas.style.left = leftOffset+frameHeight+canvas.width*i+"px";
    canvas.style.top = topOffset+frameHeight+"px";
    canvas.style.zIndex = 1;
    body.appendChild(canvas);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //left side
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = tile.colors[0];
        //ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
        ctx.fill();

        //top
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(0, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.fillStyle = tile.colors[1];
//            ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
        ctx.fill();

        //right side
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fillStyle = tile.colors[2];
//            ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
        ctx.fill();

        //bottom
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = tile.colors[3];
//            ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
        ctx.fill();

        //border
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.width);
        ctx.stroke();
    }
}

function drawFrame(frame, frameHeight, topOffset, leftOffset){
    var n = frame.pairs.length;
    var body = document.getElementsByTagName("body")[0];
    var canvas = document.createElement('canvas');
    canvas.width = n*100 + 2*frameHeight;
    canvas.height = 100 + 2*frameHeight;
    canvas.style.position = "absolute";
    canvas.style.left = leftOffset+"px";
    canvas.style.top = topOffset+"px";
    canvas.style.zIndex = 0;
    body.appendChild(canvas);

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //left side
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(frameHeight, frameHeight);
        ctx.lineTo(frameHeight, canvas.height - frameHeight);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = frame.left;
        ctx.fill();

        //right side
        ctx.beginPath();
        ctx.moveTo(canvas.width,0);
        ctx.lineTo(canvas.width - frameHeight, frameHeight);
        ctx.lineTo(canvas.width - frameHeight, canvas.height - frameHeight);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fillStyle = frame.right;
        ctx.fill();

        //top
        for(var i = 0; i < frame.pairs.length; i++) {
            if(i === 0) {
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(frameHeight, frameHeight);
                ctx.lineTo(frameHeight+(canvas.width - 2*frameHeight)/frame.pairs.length, frameHeight);
                ctx.lineTo(frameHeight+(canvas.width - 2*frameHeight)/frame.pairs.length, 0);
                ctx.fillStyle = frame.pairs[i].split(" ")[0];
                ctx.fill();
            } else if(i === frame.pairs.length-1){
                ctx.beginPath();
                ctx.moveTo(canvas.width,0);
                ctx.lineTo(canvas.width-frameHeight, frameHeight);
                ctx.lineTo(canvas.width - (frameHeight+(canvas.width - 2*frameHeight)/frame.pairs.length), frameHeight);
                ctx.lineTo(canvas.width - (frameHeight+(canvas.width - 2*frameHeight)/frame.pairs.length), 0);
                ctx.fillStyle = frame.pairs[i].split(" ")[0];
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*i, 0);
                ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*i, frameHeight);
                ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*(i+1), frameHeight);
                ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*(i+1), 0);
                ctx.fillStyle = frame.pairs[i].split(" ")[0];
                ctx.fill();
            }
        }
        //bottom
        for(var i = 0; i < frame.pairs.length; i++) {
            if(i === 0) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);
                ctx.lineTo(frameHeight, canvas.height - frameHeight);
                ctx.lineTo(frameHeight + (canvas.width - 2 * frameHeight)/frame.pairs.length, canvas.height - frameHeight);
                ctx.lineTo(frameHeight + (canvas.width - 2 * frameHeight)/frame.pairs.length, canvas.height);
                ctx.fillStyle = frame.pairs[i].split(" ")[1];
                ctx.fill();
            } else if(i === frame.pairs.length-1){
                ctx.beginPath();
                ctx.moveTo(canvas.width,canvas.height);
                ctx.lineTo(canvas.width-frameHeight, canvas.height - frameHeight);
                ctx.lineTo(canvas.width - (frameHeight+(canvas.width - 2*frameHeight)/frame.pairs.length), canvas.height - frameHeight);
                ctx.lineTo(canvas.width - (frameHeight+(canvas.width - 2*frameHeight)/frame.pairs.length), canvas.height);
                ctx.fillStyle = frame.pairs[i].split(" ")[1];
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*i, canvas.height);
                ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*i, canvas.height - frameHeight);
                ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*(i+1), canvas.height - frameHeight);
                ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*(i+1), canvas.height);
                ctx.fillStyle = frame.pairs[i].split(" ")[1];
                ctx.fill();
            }
        }

        //outer rim
        ctx.beginPath();
        ctx.rect(0,0, canvas.width, canvas.height);
        ctx.lineWidth = 5;
        ctx.stroke();

        //inner rim
        ctx.beginPath();
        ctx.rect(frameHeight, frameHeight, canvas.width - 2*frameHeight, canvas.height - 2*frameHeight);
        ctx.lineWidth = 2;
        ctx.stroke();

        //corners
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(frameHeight, frameHeight);
        ctx.moveTo(canvas.width,0);
        ctx.lineTo(canvas.width - frameHeight, frameHeight);
        ctx.moveTo(0,canvas.height);
        ctx.lineTo(frameHeight, canvas.height - frameHeight);
        ctx.moveTo(canvas.width,canvas.height);
        ctx.lineTo(canvas.width - frameHeight, canvas.height - frameHeight);
        ctx.stroke();

        //top lines
        for(var j = 1; j < frame.pairs.length; j++) {
            ctx.beginPath();
            ctx.moveTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*j,0);
            ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*j,frameHeight);
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        //bottom lines
        for(var j = 1; j < frame.pairs.length; j++) {
            ctx.beginPath();
            ctx.moveTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*j,canvas.height);
            ctx.lineTo(frameHeight+((canvas.width - 2*frameHeight)/frame.pairs.length)*j,canvas.height - frameHeight);
            ctx.lineWidth = 3;
            ctx.stroke();
        }


    }
}