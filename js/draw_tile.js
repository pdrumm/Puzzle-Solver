/**
 * Created by Kris on 2/24/2016.
 */
function drawTile(tile) {
    console.log(tile);
    //var colors = ['red', 'blue', 'green', 'yellow'];
    var body = document.getElementsByTagName("body")[0];
    for (var i = 0; i < 1; i++) {
        var canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
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
}