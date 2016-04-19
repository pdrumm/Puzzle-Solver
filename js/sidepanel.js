/**
 * Created by Patrick on 3/13/2016.
 */
/*global $, jQuery, alert*/
"use strict";

/*
EDIT TILE TAB
 */
// Create side panel to edit tiles
var tabs = '<ul id="side_tabs"></ul>';
var editTile_tab = '<li id="editTile_li"><div id="editTile_tab" class="hot side_tab"><h2>Edit Tile</h2></div></li>';
$('body').prepend(tabs);
$('ul#side_tabs').append(editTile_tab);

var editTile_panel = '<div id="editTile_panel" class="cooler side_panel"></div>';
$('body').prepend(editTile_panel);
var $editTile_panel = $('div#editTile_panel');
$editTile_panel.append('<h2>Edit Tile</h2>');
$editTile_panel.append('<canvas id="editTile_canvas"></canvas>');
var $editTile_form = $('form#editTile_form');
$editTile_form.append('<div class="input_name"><label for="msg_name">Name: </label><input id="msg_name" required placeholder="First Last"/></div>');
$editTile_form.append('<textarea required placeholder="message..."></textarea><button class="hot" type="submit">Post</button>');
$editTile_panel.append('<h2>Color Palette</h2>');

// color picker - Spectrum (http://bgrins.github.io/spectrum/)
// a dropdown with a color palette as defined below
$editTile_panel.append('<input type="text" id="color_picker">');
$("#color_picker").spectrum({
    showPaletteOnly: true,
    showPalette: true,
    color: 'white',
    palette: [
        ['white', 'silver', 'gray', 'black'],
        ['red','maroon','orange','yellow'],
        ['olive','lime','green','aqua'],
        ['blue','navy','fuchsia','purple']
    ]
});

// add toggle listener to edit button
$('div#editTile_tab').on('click',function(e){
    $('#editTile_panel').toggle("slide");
    $('#instructions_li').slideToggle();
});

var editing_tile = {
    width: 150,
    height: 150,
    top: 0,
    left: 0,
    colors: ['white','white','white','white']
};
//update_editTile(editing_tile.colors);
// update the color of the tile in the side panel
function update_editTile(colors){
    editing_tile.colors = colors;
    // draw on canvas
    var canvas = document.getElementById('editTile_canvas'),
        ctx = canvas.getContext('2d');
    // left
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.moveTo(editing_tile.left + (editing_tile.width / 2), editing_tile.top + (editing_tile.height / 2));
    ctx.lineTo(editing_tile.left, editing_tile.top + editing_tile.height);
    ctx.lineTo(editing_tile.left, editing_tile.top);
    ctx.fill();
    // top
    ctx.fillStyle = colors[1];
    ctx.beginPath();
    ctx.moveTo(editing_tile.left + (editing_tile.width / 2), editing_tile.top + (editing_tile.height / 2));
    ctx.lineTo(editing_tile.left, editing_tile.top);
    ctx.lineTo(editing_tile.left + editing_tile.width, editing_tile.top);
    ctx.fill();
    // right
    ctx.fillStyle = colors[2];
    ctx.beginPath();
    ctx.moveTo(editing_tile.left + (editing_tile.width / 2), editing_tile.top + (editing_tile.height / 2));
    ctx.lineTo(editing_tile.left + editing_tile.width, editing_tile.top);
    ctx.lineTo(editing_tile.left + editing_tile.width, editing_tile.top + editing_tile.height);
    ctx.fill();
    // bot
    ctx.fillStyle = colors[3];
    ctx.beginPath();
    ctx.moveTo(editing_tile.left + (editing_tile.width / 2), editing_tile.top + (editing_tile.height / 2));
    ctx.lineTo(editing_tile.left + editing_tile.width, editing_tile.top + editing_tile.height);
    ctx.lineTo(editing_tile.left, editing_tile.top + editing_tile.height);
    ctx.fill();
    //border
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(editing_tile.left, editing_tile.top);
    ctx.lineTo(editing_tile.left + editing_tile.width, editing_tile.top);
    ctx.lineTo(editing_tile.left + editing_tile.width, editing_tile.top + editing_tile.height);
    ctx.lineTo(editing_tile.left, editing_tile.top + editing_tile.height);
    ctx.lineTo(editing_tile.left, editing_tile.top);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.moveTo(editing_tile.left, editing_tile.top);
    ctx.lineTo(editing_tile.left + editing_tile.width, editing_tile.top + editing_tile.height);
    ctx.moveTo(editing_tile.left + editing_tile.width, editing_tile.top);
    ctx.lineTo(editing_tile.left, editing_tile.top + editing_tile.height);
    ctx.stroke();
    // solve with changed tiles
    redraw_tiles(frame);
}

// Update the color of the tile shown in the side panel when its clicked on!
var $color_canvas = $('#editTile_canvas')[0];
$color_canvas.addEventListener('click', function(event) {
    // grab (x,y) relative to canvas
    var rect = $color_canvas.getBoundingClientRect();
    var x = event.clientX - rect.left,
        y = event.clientY - rect.top;

    if (y > editing_tile.top && y < editing_tile.top + editing_tile.height && x > editing_tile.left && x < editing_tile.left + editing_tile.width) {
        // calculate coordinate sum
        var coord_sum = x + y;
        // find triangle edited
        var edited_tri;
        if( x < y ){
            // left & bottom
            if( coord_sum < editing_tile.width ){
                // left
                edited_tri = 0;
            } else {
                // bottom
                edited_tri = 3;
            }
        } else {
            // top & right
            if( coord_sum < editing_tile.width ){
                // top
                edited_tri = 1;
            } else {
                // right
                edited_tri = 2;
            }
        }
        editing_tile.colors[edited_tri] = $('#color_picker').spectrum("get").toName();
        update_editTile(editing_tile.colors);
    }
}, false);

/*
INSTRUCTIONS TAB
 */
var instructions_tab = '<li id="instructions_li"><div id="instructions_tab" class="hot side_tab"><h2>Instructions</h2></div></li>';
$('ul#side_tabs').append(instructions_tab);

var instructions_panel = '<div id="instructions_panel" class="cooler side_panel"></div>';
$('body').prepend(instructions_panel);
var $instructions_panel = $('div#instructions_panel');

var instructions =
'<div id="instructions">'+
'<h2>Instructions:</h2>'+
'<ul>'+
'<li><b>Create a randomly generated puzzle</b></li>'+
'<ol>'+
'<li>Enter a number in the <b>Puzzle Size</b> textbox</li>'+
'<li>Check the <b>Random Puzzle Generator</b> checkbox</li>'+
'<li>Click <b>generate</b></li>'+
'</ol>'+
'<li><b>Create a user-defined puzzle</b></li>'+
'<ol>'+
'<li>Enter a string of valid colors into <b>Tile String</b></li>'+
'<ul>'+
'<li>Valid colors include: <i>red, yellow, green, blue</i></li>'+
'</ul>'+
'<li>Enter a string of valid colors into <b>Frame String</b></li>'+
'<ul>'+
'<li>Valid colors include: <i>red, yellow, green, blue</i></li>'+
'</ul>'+
'<li>Uncheck the <b>Random Puzzle Generator</b> checkbox</li>'+
'<li>Click <b>generate</b></li>'+
'</ol>'+
'<li><b>Solve your puzzle!</b></li>'+
'<ol>'+
'<li><i>Single click</i> on an open tile to select it</li>'+
'<li><i>Double click</i> on an open tile to rotate it</li>'+
'<li>Once an open tile is selected, <i>single click</i> on a tile'+
'<br/>space in the above frame to place it there</li>'+
'<li><i>Double click</i> on a placed tile in the frame to remove it</li>'+
'<li>Check the <b>Show solution</b> checkbox<i>...if you dare give up</i></li>'+
'</ol>'+
'</ul>'+
'</div>';

$instructions_panel.append(instructions);

// add toggle listener to edit button
$('div#instructions_tab').on('click',function(e){
    $('#instructions_panel').toggle("slide");
    $('#editTile_li').slideToggle();
});

function redraw_tiles(my_frame) {
    // Start State
    console.log(my_frame);
    var start = my_frame.left;
    // Final State Set
    var accept = my_frame.right;
    //mix_tiles(tiles);
    var puz_size = $('#puz_size').val();
    var show_soln = $('#show_soln')[0].checked;
    console.log(show_soln);

    var objs = build_delta(tiles);
    var transitions = objs[0];
    var parent_tile = objs[1];
    var soln = []; // initialize array to include tiles with proper orientations
    var trans_soln=[], next_state_soln=[];
    var solved = solve_path(start, transitions, accept, my_frame.pairs, soln, parent_tile, trans_soln, next_state_soln); // find the solution
    // store data in hidden fields for the nfa
    next_state_soln.unshift(start);
    $('#nfa_graph').val(JSON.stringify(transitions));
    $('#nfa_transitions').val(JSON.stringify(trans_soln));
    $('#nfa_next_state').val(JSON.stringify(next_state_soln));

    if (solved) { // puzzle has solution: Display desired information
        if (show_soln) {
            drawFrame(my_frame, 20, 450, 20, "lvl3", true);
        }
        var i;
        console.log(my_frame.pairs);
        drawFrame(my_frame, 20, 300, 20, "lvl2", false);
        elements3 = [];
        elements2 = [];
        for (i = 0; i < puz_size; i++) {
            // frame set 3
            pushTile(tiles[soln[i].i], 20, i, 0, 3, soln[i].j);//,soln[i].j);
            // frame set 2
            pushTile(tiles[i], 0, i, (20*2)/(puz_size-1),2,0);
        }
        if (show_soln) drawTiles(3); // user wants to view the solution
        drawTiles(2);

        drawFrame(my_frame, 20, 150, 20, "lvl1", true);
        // draw empties
        for (i = 0; i < puz_size; i++) {
            pushTile(Tile('white', 'white', 'white', 'white'), 20, i, 0, 1, 0);
        }
        drawTiles(1);

    } else { // puzzle is not solvable
        drawFrame(my_frame, 20, 150, 20, "lvl1", true);
        drawFrame(my_frame, 20, 300, 20, "lvl2", false);
        for (i = 0; i < puz_size; i++) {
            pushTile(tiles[i], 0, i, (20 * 2) / (puz_size - 1), 2);
            pushTile(Tile('white', 'white', 'white', 'white'), 20, i, 0, 1);
        }
        drawTiles(2);
        drawTiles(1);


        if (show_soln) { // user wants to see solution, but there is no solution
            drawFrame(my_frame, 20, 450, 20, "lvl3", true);
            print_unsolvable(document.getElementById("lvl3")); // display unsolvable message
        }
    }
}