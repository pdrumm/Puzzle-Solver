/**
 * Created by Kris on 2/24/2016.
 */

function drawFrame(frame, frameHeight, topOffset, leftOffset, id, do_frame){
    var n = frame.pairs.length;
    var canvas = document.getElementById(id);
    canvas.width = n*100 + 2*frameHeight;
    if(!do_frame){canvas.width+=6;}
    canvas.height = 100 + 2*frameHeight;
    canvas.style.position = "absolute";
    canvas.style.left = leftOffset+"px";
    if(!do_frame){canvas.style.left-=3;}
    canvas.style.top = topOffset+"px";
    if(!do_frame){canvas.style.paddingTop+=20+"px";}

    elem1 = document.getElementById('lvl1');
        elem1Left = elem1.offsetLeft;
        elem1Top = elem1.offsetTop;

    var elem2 = document.getElementById('lvl2');
        elem2Left = elem2.offsetLeft;
        elem2Top = elem2.offsetTop;


    if(canvas.getContext && do_frame) {
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

var elem1 = document.getElementById('lvl1'),
    elem1Left = elem1.offsetLeft,
    elem1Top = elem1.offsetTop,
    ctx1 = elem1.getContext('2d'),
    elements1 = [];
var elem2 = document.getElementById('lvl2'),
    elem2Left = elem2.offsetLeft,
    elem2Top = elem2.offsetTop,
    ctx2 = elem2.getContext('2d'),
    elements2 = [];

function highlight1(e){
    ctx1.strokeStyle = 'gold';
    ctx1.beginPath();
    ctx1.lineWidth = 3;
    ctx1.moveTo(e.left, e.top);
    ctx1.lineTo(e.left + e.width, e.top);
    ctx1.lineTo(e.left + e.width, e.top + e.height);
    ctx1.lineTo(e.left, e.top + e.height);
    ctx1.lineTo(e.left, e.top);
    ctx1.stroke();
}
function unhighlight1(e){
    ctx1.strokeStyle = 'black';
    ctx1.beginPath();
    ctx1.lineWidth = 3;
    ctx1.moveTo(e.left, e.top);
    ctx1.lineTo(e.left + e.width, e.top);
    ctx1.lineTo(e.left + e.width, e.top + e.height);
    ctx1.lineTo(e.left, e.top + e.height);
    ctx1.lineTo(e.left, e.top);
    ctx1.stroke();
}
function highlight2(e){
    ctx2.clearRect(0, 0, ctx2.width, ctx2.height);
    drawTiles(2);
    ctx2.strokeStyle = 'gold';
    ctx2.beginPath();
    ctx2.lineWidth = 5;
    ctx2.moveTo(e.left, e.top);
    ctx2.lineTo(e.left + e.width, e.top);
    ctx2.lineTo(e.left + e.width, e.top + e.height);
    ctx2.lineTo(e.left, e.top + e.height);
    ctx2.lineTo(e.left, e.top);
    ctx2.stroke();
}
function unhighlight2(e){
    ctx2.strokeStyle = 'black';
    ctx2.beginPath();
    ctx2.lineWidth = 3;
    ctx2.moveTo(e.left, e.top);
    ctx2.lineTo(e.left + e.width, e.top);
    ctx2.lineTo(e.left + e.width, e.top + e.height);
    ctx2.lineTo(e.left, e.top + e.height);
    ctx2.lineTo(e.left, e.top);
    ctx2.stroke();
}

// Add event listener for `click` events.
elem1.addEventListener('click', function(event) {
    var x = event.pageX - elem1Left,
        y = event.pageY - elem1Top;
    var e;
    elements1.forEach(function(element) {
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            elements2.forEach(function(e_sel) {
                if(e_sel.selected===true){
                    for(var i=0;i<element.colours.length;i++) {
                        element.colours[i] = e_sel.colours[i];
                    }
                    drawTiles(1);
                }
            });
        }
    });
}, false);
elem1.addEventListener('dblclick', function(event) {
    var x = event.pageX - elem1Left,
        y = event.pageY - elem1Top;
    var e;
    elements1.forEach(function(element) {
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            elements2.forEach(function(e_sel) {
                if(e_sel.selected===true){
                    for(var i=0;i<element.colours.length;i++) {
                        element.colours[i] = 'white';
                    }
                    drawTiles(1);
                }
            });
        }
    });
}, false);
elem2.addEventListener('click', function(event) {
    var x = event.pageX - elem2Left,
        y = event.pageY - elem2Top;
    var e;
    elements2.forEach(function(element) {
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            e = element;
            element.selected = true;
        } else {
            unhighlight2(element);
            element.selected = false;
        }
    });
    highlight2(e);
}, false);
elem2.addEventListener('dblclick', function(event) {
    var x = event.pageX - elem2Left,
        y = event.pageY - elem2Top;
    var e;
    elements2.forEach(function(element) {
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            element.colours.unshift(element.colours.pop());
            drawTiles(2);
            highlight2(element);
        }
    });
}, false);


function pushTile(tile, frameHeight, i, tileGap, elem) {
    //var colors = ['red', 'blue', 'green', 'yellow'];
    // Add element.
    if(elem===1){
        elements1.push({
            id: 'e' + i.toString(),
            colours: tile.colors,
            width: 100,
            height: 100,
            top: frameHeight,
            left: frameHeight + 100 * i + tileGap * i
        });
    } else if(elem===2) {
        elements2.push({
            id: 'e' + i.toString(),
            colours: tile.colors,
            width: 100,
            height: 100,
            top: frameHeight,
            left: frameHeight + 100 * i + tileGap * i
        });
    }
    //console.log(elements1[elements1.length-1]);
    //var body = document.getElementsByTagName("body")[0];
    //var canvas = document.createElement('canvas');
    //canvas.width = 100;
    //canvas.height = 100;
    //canvas.style.position = "absolute";
    //canvas.style.left = leftOffset+frameHeight+canvas.width*i+"px";
    //canvas.style.top = topOffset+frameHeight+"px";
    //canvas.style.zIndex = 1;
    //body.appendChild(canvas);
//    if (canvas.getContext) {
//        var ctx = canvas.getContext('2d');
//        //left side
//        ctx.beginPath();
//        ctx.moveTo(canvas.width / 2, canvas.height / 2);
//        ctx.lineTo(0, 0);
//        ctx.lineTo(0, canvas.height);
//        ctx.fillStyle = tile.colors[0];
//        //ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
//        ctx.fill();
//
//        //top
//        ctx.beginPath();
//        ctx.moveTo(canvas.width / 2, canvas.height / 2);
//        ctx.lineTo(0, 0);
//        ctx.lineTo(canvas.width, 0);
//        ctx.fillStyle = tile.colors[1];
////            ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
//        ctx.fill();
//
//        //right side
//        ctx.beginPath();
//        ctx.moveTo(canvas.width / 2, canvas.height / 2);
//        ctx.lineTo(canvas.width, 0);
//        ctx.lineTo(canvas.width, canvas.height);
//        ctx.fillStyle = tile.colors[2];
////            ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
//        ctx.fill();
//
//        //bottom
//        ctx.beginPath();
//        ctx.moveTo(canvas.width / 2, canvas.height / 2);
//        ctx.lineTo(canvas.width, canvas.height);
//        ctx.lineTo(0, canvas.height);
//        ctx.fillStyle = tile.colors[3];
////            ctx.fillStyle = colors[Math.floor((Math.random() * 4))];
//        ctx.fill();
//
//        //border
//        ctx.beginPath();
//        ctx.lineWidth = 5;
//        ctx.moveTo(0, 0);
//        ctx.lineTo(canvas.width, 0);
//        ctx.lineTo(canvas.width, canvas.height);
//        ctx.lineTo(0, canvas.height);
//        ctx.lineTo(0, 0);
//        ctx.stroke();
//        ctx.lineWidth = 2;
//        ctx.moveTo(0, 0);
//        ctx.lineTo(canvas.width, canvas.height);
//        ctx.moveTo(canvas.width, 0);
//        ctx.lineTo(0, canvas.width);
//        ctx.stroke();
//    }
}

// Render elements.
function drawTiles(elem){
    var e;
    var ctx;
    if(elem===1){
        e = elements1;
        ctx = ctx1;
    } else if(elem===2){
        e = elements2;
        ctx = ctx2;
    }
    e.forEach(function (element) {
        // top
        ctx.fillStyle = element.colours[0];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left, element.top);
        ctx.lineTo(element.left + element.width, element.top);
        ctx.fill();
        // right
        ctx.fillStyle = element.colours[1];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left + element.width, element.top);
        ctx.lineTo(element.left + element.width, element.top + element.height);
        ctx.fill();
        // bot
        ctx.fillStyle = element.colours[2];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left + element.width, element.top + element.height);
        ctx.lineTo(element.left, element.top + element.height);
        ctx.fill();
        // left
        ctx.fillStyle = element.colours[3];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left, element.top + element.height);
        ctx.lineTo(element.left, element.top);
        ctx.fill();
        //border
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(element.left, element.top);
        ctx.lineTo(element.left + element.width, element.top);
        ctx.lineTo(element.left + element.width, element.top + element.height);
        ctx.lineTo(element.left, element.top + element.height);
        ctx.lineTo(element.left, element.top);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.moveTo(element.left, element.top);
        ctx.lineTo(element.left + element.width, element.top + element.height);
        ctx.moveTo(element.left + element.width, element.top);
        ctx.lineTo(element.left, element.top + element.height);
        ctx.stroke();
    });
}