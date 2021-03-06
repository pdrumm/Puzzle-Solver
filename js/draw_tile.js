/**
 * draw_tile.js is our main compilation of js-to-html scripts
 * Included in it is the ability to create the puzzle frames and tiles,
 * as well as the ability to rotate the tiles and insert them into the
 * puzzle frame.
 */

// draws the frame for the *id*th canvas
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

    elem2 = document.getElementById('lvl2');
        elem2Left = elem2.offsetLeft;
        elem2Top = elem2.offsetTop;

    elem3 = document.getElementById('lvl3');
        elem3Left = elem3.offsetLeft;
        elem3Top = elem3.offsetTop;


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
var elem3 = document.getElementById('lvl3'),
    elem3Left = elem3.offsetLeft,
    elem3Top = elem3.offsetTop,
    ctx3 = elem3.getContext('2d'),
    elements3 = [];

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
    var rect = elem1.getBoundingClientRect();
    var x = event.clientX - rect.left,
        y = event.clientY - rect.top;
    //var x = event.pageX - elem1Left,
    //    y = event.pageY - elem1Top;
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
        } else if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {

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

    var rect = elem2.getBoundingClientRect();
    var x = event.clientX - rect.left,
        y = event.clientY - rect.top - 20;
    //var x = event.pageX - elem2Left,
    //    y = event.pageY - elem2Top;
    var e;
    elements2.forEach(function(element) {
        console.log(element);
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            e = element;
            element.selected = true;
            update_editTile(element.colours);
        } else {
            unhighlight2(element);
            element.selected = false;
        }
    });
    highlight2(e);
    // toggle edit tile panel
    if($('#editTile_panel:hidden').length > 0){
        $('#editTile_panel').toggle("slide");
        $('#instructions_li').slideToggle();
    }
}, false);

//function clear_callback (my_frame,is_soln) {
    // show soln toggle button
    $(document).on('click', '.toggle-button', function() {
        $(this).toggleClass('toggle-button-selected');
        if($(this).hasClass('toggle-button-selected')){
            drawFrame(frame, 20, 450, 20, "lvl3", true);
            if(solved) {
                drawTiles(3);
            } else {
                print_unsolvable(document.getElementById("lvl3"));
            }
        }else{
            var c = $('canvas#lvl3');
            c[0].getContext('2d').clearRect(0, 0, c[0].width, c[0].height);
        }
    });
    //$('#show_soln').on('click',function(e){
    //    if($('#show_soln').is(':checked')){
    //        drawFrame(my_frame, 20, 450, 20, "lvl3", true);
    //        if(is_soln) {
    //            drawTiles(3);
    //        } else {
    //            print_unsolvable(document.getElementById("lvl3"));
    //        }
    //    } else {
    //        var c = $('canvas#lvl3');
    //        c[0].getContext('2d').clearRect(0, 0, c[0].width, c[0].height);
    //    }
    //})
//}

function print_unsolvable(canvas){
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("No Solution", canvas.width/2, canvas.height/2+8);
}

function pushTile(tile, frameHeight, i, tileGap, elem, orientation) {
    //var colors = ['red', 'blue', 'green', 'yellow'];
    // Add element.
    if (elem === 1) {
        elements1.push({
            id: 'e' + i.toString(),
            colours: tile.colors,
            width: 100,
            height: 100,
            top: frameHeight,
            left: frameHeight + 100 * i + tileGap * i
        });
    } else if (elem === 2) {
        elements2.push({
            id: 'e' + i.toString(),
            colours: tile.colors,
            width: 100,
            height: 100,
            top: frameHeight,
            left: frameHeight + 100 * i + tileGap * i
        });
    } else if (elem === 3) {
        var color_copy = [];
        for(var q=0; q<4; q++){color_copy.push(tile.colors[q]);}
        for(var x=0; x<orientation; x++){
            color_copy.push(color_copy.shift());
        }
        elements3.push({
            id: 'e' + i.toString(),
            colours: color_copy,
            width: 100,
            height: 100,
            top: frameHeight,
            left: frameHeight + 100 * i + tileGap * i
        });
    }
}

function pushTile_NxN(tile, frameHeight, i, j, elem, orientation) {
    //var colors = ['red', 'blue', 'green', 'yellow'];
    // Add element.
    if (elem === 1) {
        elements1.push({
            id: 'e' + i.toString() + j.toString(),
            colours: tile.colors,
            width: 100,
            height: 100,
            top: frameHeight + 100 * j,
            left: frameHeight + 100 * i
        });
    } else if (elem === 3) {
        elements3.push({
            id: 'e' + i.toString() + j.toString(),
            colours: tile.colors,
            width: 100,
            height: 100,
            top: frameHeight + 100 * j,
            left: frameHeight + 100 * i
        });
    } else if (elem === 2) {
        var color_copy = [];
        for(var q=0; q<4; q++){color_copy.push(tile.colors[q]);}
        console.log(orientation);
        for(var x=0; x<orientation; x++){
            if(elements2.length>0) {
                elements2.push(elements2.shift());
            }
            color_copy.push(color_copy.shift());
        }
        elements2.push({
            id: 'e' + i.toString() + j.toString(),
            colours: color_copy,
            width: 100,
            height: 100,
            top: frameHeight + 100 * j,
            left: frameHeight + 100 * i
        });
    }
}

// Render elements.
function drawTiles(elem) {
    var e;
    var ctx;
    if (elem === 1) {
        e = elements1;
        ctx = ctx1;
    } else if (elem === 2) {
        e = elements2;
        ctx = ctx2;
    } else if (elem === 3) {
        e = elements3;
        ctx = ctx3;
    }
    e.forEach(function (element) {
        // left
        ctx.fillStyle = element.colours[0];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left, element.top + element.height);
        ctx.lineTo(element.left, element.top);
        ctx.fill();
        // top
        ctx.fillStyle = element.colours[1];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left, element.top);
        ctx.lineTo(element.left + element.width, element.top);
        ctx.fill();
        // right
        ctx.fillStyle = element.colours[2];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left + element.width, element.top);
        ctx.lineTo(element.left + element.width, element.top + element.height);
        ctx.fill();
        // bot
        ctx.fillStyle = element.colours[3];
        ctx.beginPath();
        ctx.moveTo(element.left + (element.width / 2), element.top + (element.height / 2));
        ctx.lineTo(element.left + element.width, element.top + element.height);
        ctx.lineTo(element.left, element.top + element.height);
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

function draw_NxN(tiles, frame, tile_size, frameHeight, canvas_id, width, height, topOffset, leftOffset, drawFrame) {
    var n = width;
    var m = height;
    var canvas = document.getElementById(canvas_id);
    canvas.width = n*tile_size + 2*frameHeight;
    canvas.height = m*tile_size + 2*frameHeight;
    canvas.style.position = "absolute";
    canvas.style.left = leftOffset + "px";
    canvas.style.top = topOffset + "px";
    var i, j;

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        if(drawFrame) {
            //left frame
            for (i = 0; i < m; i++) {
                if (i === 0) {
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(frameHeight, frameHeight);
                    ctx.lineTo(frameHeight, frameHeight + (canvas.height - 2 * frameHeight) / m);
                    ctx.lineTo(0, frameHeight + (canvas.height - 2 * frameHeight) / m);
                    ctx.fillStyle = frame.left[i];
                    ctx.fill();
                } else if (i === (m - 1)) {
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height);
                    ctx.lineTo(frameHeight, canvas.height - frameHeight);
                    ctx.lineTo(frameHeight, canvas.height - (frameHeight + (canvas.height - 2 * frameHeight) / m));
                    ctx.lineTo(0, canvas.height - (frameHeight + (canvas.height - 2 * frameHeight) / m));
                    ctx.fillStyle = frame.left[i];
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(0, frameHeight + ((canvas.height - 2 * frameHeight) / m) * i);
                    ctx.lineTo(frameHeight, frameHeight + ((canvas.height - 2 * frameHeight) / m) * i);
                    ctx.lineTo(frameHeight, frameHeight + ((canvas.height - 2 * frameHeight) / m) * (i + 1));
                    ctx.lineTo(0, frameHeight + ((canvas.height - 2 * frameHeight) / m) * (i + 1));
                    ctx.fillStyle = frame.left[i];
                    ctx.fill();
                }
            }

            //top frame
            for (i = 0; i < n; i++) {
                if (i === 0) {
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(frameHeight, frameHeight);
                    ctx.lineTo(frameHeight + (canvas.width - 2 * frameHeight) / n, frameHeight);
                    ctx.lineTo(frameHeight + (canvas.width - 2 * frameHeight) / n, 0);
                    ctx.fillStyle = frame.top[i];
                    ctx.fill();
                } else if (i === n - 1) {
                    ctx.beginPath();
                    ctx.moveTo(canvas.width, 0);
                    ctx.lineTo(canvas.width - frameHeight, frameHeight);
                    ctx.lineTo(canvas.width - (frameHeight + (canvas.width - 2 * frameHeight) / n), frameHeight);
                    ctx.lineTo(canvas.width - (frameHeight + (canvas.width - 2 * frameHeight) / n), 0);
                    ctx.fillStyle = frame.top[i];
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * i, 0);
                    ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * i, frameHeight);
                    ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * (i + 1), frameHeight);
                    ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * (i + 1), 0);
                    ctx.fillStyle = frame.top[i];
                    ctx.fill();
                }
            }

            //bottom frame
            for (i = 0; i < n; i++) {
                if (i === 0) {
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height);
                    ctx.lineTo(frameHeight, canvas.height - frameHeight);
                    ctx.lineTo(frameHeight + (canvas.width - 2 * frameHeight) / n, canvas.height - frameHeight);
                    ctx.lineTo(frameHeight + (canvas.width - 2 * frameHeight) / n, canvas.height);
                    ctx.fillStyle = frame.bottom[i];
                    ctx.fill();
                } else if (i === n - 1) {
                    ctx.beginPath();
                    ctx.moveTo(canvas.width, canvas.height);
                    ctx.lineTo(canvas.width - frameHeight, canvas.height - frameHeight);
                    ctx.lineTo(canvas.width - (frameHeight + (canvas.width - 2 * frameHeight) / n), canvas.height - frameHeight);
                    ctx.lineTo(canvas.width - (frameHeight + (canvas.width - 2 * frameHeight) / n), canvas.height);
                    ctx.fillStyle = frame.bottom[i];
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * i, canvas.height);
                    ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * i, canvas.height - frameHeight);
                    ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * (i + 1), canvas.height - frameHeight);
                    ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * (i + 1), canvas.height);
                    ctx.fillStyle = frame.bottom[i];
                    ctx.fill();
                }
            }

            //right frame
            for (i = 0; i < m; i++) {
                if (i === 0) {
                    ctx.beginPath();
                    ctx.moveTo(canvas.width, 0);
                    ctx.lineTo(canvas.width - frameHeight, frameHeight);
                    ctx.lineTo(canvas.width - frameHeight, frameHeight + (canvas.height - 2 * frameHeight) / m);
                    ctx.lineTo(canvas.width, frameHeight + (canvas.height - 2 * frameHeight) / m);
                    ctx.fillStyle = frame.right[i];
                    ctx.fill();
                } else if (i === m - 1) {
                    ctx.beginPath();
                    ctx.moveTo(canvas.width, canvas.height);
                    ctx.lineTo(canvas.width - frameHeight, canvas.height - frameHeight);
                    ctx.lineTo(canvas.width - frameHeight, canvas.height - (frameHeight + (canvas.height - 2 * frameHeight) / m));
                    ctx.lineTo(canvas.width, canvas.height - (frameHeight + (canvas.height - 2 * frameHeight) / m));
                    ctx.fillStyle = frame.right[i];
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(canvas.width, frameHeight + ((canvas.height - 2 * frameHeight) / m) * i);
                    ctx.lineTo(canvas.width - frameHeight, frameHeight + ((canvas.height - 2 * frameHeight) / m) * i);
                    ctx.lineTo(canvas.width - frameHeight, frameHeight + ((canvas.height - 2 * frameHeight) / m) * (i + 1));
                    ctx.lineTo(canvas.width, frameHeight + ((canvas.height - 2 * frameHeight) / m) * (i + 1));
                    ctx.fillStyle = frame.right[i];
                    ctx.fill();
                }
            }

            //frame border
            //outer rim
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 5;
            ctx.stroke();

            //inner rim
            ctx.beginPath();
            ctx.rect(frameHeight, frameHeight, canvas.width - 2 * frameHeight, canvas.height - 2 * frameHeight);
            ctx.lineWidth = 2;
            ctx.stroke();

            //corners
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(frameHeight, frameHeight);
            ctx.moveTo(canvas.width, 0);
            ctx.lineTo(canvas.width - frameHeight, frameHeight);
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(frameHeight, canvas.height - frameHeight);
            ctx.moveTo(canvas.width, canvas.height);
            ctx.lineTo(canvas.width - frameHeight, canvas.height - frameHeight);
            ctx.stroke();

            //top lines
            for (j = 1; j < n; j++) {
                ctx.beginPath();
                ctx.moveTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * j, 0);
                ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * j, frameHeight);
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            //bottom lines
            for (j = 1; j < n; j++) {
                ctx.beginPath();
                ctx.moveTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * j, canvas.height);
                ctx.lineTo(frameHeight + ((canvas.width - 2 * frameHeight) / n) * j, canvas.height - frameHeight);
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            //left line
            for (j = 1; j < m; j++) {
                ctx.beginPath();
                ctx.moveTo(0, frameHeight + ((canvas.height - 2 * frameHeight) / m) * j);
                ctx.lineTo(frameHeight, frameHeight + ((canvas.height - 2 * frameHeight) / m) * j);
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            //right line
            for (j = 1; j < m; j++) {
                ctx.beginPath();
                ctx.moveTo(canvas.width, frameHeight + ((canvas.height - 2 * frameHeight) / m) * j);
                ctx.lineTo(canvas.width - frameHeight, frameHeight + ((canvas.height - 2 * frameHeight) / m) * j);
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        }

        //tiles
        for (i = 0; i < m*n; i++) {
            //top
            ctx.fillStyle = tiles[i].colors[1];
            ctx.beginPath();
            ctx.moveTo(frameHeight+tile_size*(i%n), frameHeight+tile_size*Math.floor(i/n));
            ctx.lineTo(frameHeight+tile_size*(i%n)+(tile_size/2), frameHeight+tile_size*Math.floor(i/n)+tile_size/2);
            ctx.lineTo(frameHeight+tile_size*((i%n)+1), frameHeight+tile_size*Math.floor(i/n));
            ctx.fill();

            //left
            ctx.fillStyle = tiles[i].colors[0];
            ctx.beginPath();
            ctx.moveTo(frameHeight+tile_size*(i%n), frameHeight+tile_size*Math.floor(i/n));
            ctx.lineTo(frameHeight+tile_size*(i%n)+(tile_size/2), frameHeight + tile_size*Math.floor(i/n)+tile_size/2);
            ctx.lineTo(frameHeight+tile_size*(i%n), frameHeight+tile_size*(Math.floor(i/n)+1));
            ctx.fill();

            //right
            ctx.fillStyle = tiles[i].colors[2];
            ctx.beginPath();
            ctx.moveTo(frameHeight+tile_size*((i%n)+1), frameHeight+tile_size*Math.floor(i/n));
            ctx.lineTo(frameHeight+tile_size*(i%n)+(tile_size/2), frameHeight + tile_size*Math.floor(i/n)+tile_size/2);
            ctx.lineTo(frameHeight+tile_size*((i%n)+1), frameHeight+tile_size*(Math.floor(i/n)+1));
            ctx.fill();

            //bottom
            ctx.fillStyle = tiles[i].colors[3];
            ctx.beginPath();
            ctx.moveTo(frameHeight+tile_size*(i%n), frameHeight+tile_size*(Math.floor(i/n)+1));
            ctx.lineTo(frameHeight+tile_size*(i%n)+(tile_size/2), frameHeight + tile_size*Math.floor(i/n)+tile_size/2);
            ctx.lineTo(frameHeight+tile_size*((i%n)+1), frameHeight+tile_size*(Math.floor(i/n)+1));
            ctx.fill();

            //border
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.rect(frameHeight+tile_size*(i%n), frameHeight+tile_size*Math.floor(i/n), tile_size, tile_size);
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.moveTo(frameHeight+tile_size*(i%n), frameHeight+tile_size*Math.floor(i/n));
            ctx.lineTo(frameHeight+tile_size*((i%n)+1), frameHeight+tile_size*(Math.floor(i/n)+1));
            ctx.moveTo(frameHeight+tile_size*((i%n)+1), frameHeight+tile_size*Math.floor(i/n));
            ctx.lineTo(frameHeight+tile_size*(i%n), frameHeight+tile_size*(Math.floor(i/n)+1));
            ctx.stroke();
        }
    }
}