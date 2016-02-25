/**
 * Created by Kris on 2/24/2016.
 */
function drawTile(tile, frameHeight, i) {
    console.log(tile);
    //var colors = ['red', 'blue', 'green', 'yellow'];
    var body = document.getElementsByTagName("body")[0];
    var canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    canvas.style.position = "absolute";
    var top = 20+frameHeight;
    canvas.style.left = 20+frameHeight+canvas.width*i+"px";
    canvas.style.top = 50+frameHeight+"px";
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
        ctx.lineWidth = 3;
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.width);
        ctx.stroke();
    }
}

function drawFrame(frame, frameHeight){
    var n = 4;
    //var colors = ['red', 'blue', 'green', 'yellow'];
    var body = document.getElementsByTagName("body")[0];
    var canvas = document.createElement('canvas');
    canvas.width = n*100 + 2*frameHeight;
    canvas.height = 100 + 2*frameHeight;
    canvas.style.position = "absolute";
    canvas.style.left = 20+"px";
    canvas.style.top = 50+"px";
    canvas.style.zIndex = 0;
    body.appendChild(canvas);

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //outer rim
        ctx.rect(0,0, canvas.width, canvas.height);
        ctx.lineWidth = 5;
        ctx.stroke();

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

        console.log(frame[0])
    }
}