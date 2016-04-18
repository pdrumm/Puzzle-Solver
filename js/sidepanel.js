/**
 * Created by Patrick on 3/13/2016.
 */
/*global $, jQuery, alert*/
"use strict";

// Create side panel to edit tiles
var tabs = '<ul id="side_tabs"></ul>';
var forum_tab = '<li id="editTile_li"><div id="editTile_tab" class="hot side_tab"><h2>Edit Tile</h2></div></li>';
$('body').prepend(tabs);
$('ul#side_tabs').append(forum_tab);

var editTile_panel = '<div id="editTile_panel" class="cooler side_panel"></div>';
$('body').prepend(editTile_panel);
var $editTile_panel = $('div#editTile_panel');
$editTile_panel.append('<h2>Edit Tile</h2>');
$editTile_panel.append('<canvas id="editTile_canvas"></canvas>');
var $editTile_form = $('form#editTile_form');
$editTile_form.append('<div class="input_name"><label for="msg_name">Name: </label><input id="msg_name" required placeholder="First Last"/></div>');
$editTile_form.append('<textarea required placeholder="message..."></textarea><button class="hot" type="submit">Post</button>');
$editTile_panel.append('<h2>Edit Tile</h2>');

// color picker - Spectrum (http://bgrins.github.io/spectrum/)
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
$('body').on('click',function(e){console.log($('#color_picker').spectrum("get").toName())});

// add toggle listener to edit button
$('div#editTile_tab').on('click',function(e){
    $('#editTile_panel').toggle("slide");
});

// update the color of the tile in the side panel
function update_editTile(colors){
    // draw on canvas
    var canvas = document.getElementById('editTile_canvas'),
        ctx = canvas.getContext('2d');
    var tile = {
        width: 150,
        height: 150,
        top: 0,
        left: 0
    };
    // left
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.moveTo(tile.left + (tile.width / 2), tile.top + (tile.height / 2));
    ctx.lineTo(tile.left, tile.top + tile.height);
    ctx.lineTo(tile.left, tile.top);
    ctx.fill();
    // top
    ctx.fillStyle = colors[1];
    ctx.beginPath();
    ctx.moveTo(tile.left + (tile.width / 2), tile.top + (tile.height / 2));
    ctx.lineTo(tile.left, tile.top);
    ctx.lineTo(tile.left + tile.width, tile.top);
    ctx.fill();
    // right
    ctx.fillStyle = colors[2];
    ctx.beginPath();
    ctx.moveTo(tile.left + (tile.width / 2), tile.top + (tile.height / 2));
    ctx.lineTo(tile.left + tile.width, tile.top);
    ctx.lineTo(tile.left + tile.width, tile.top + tile.height);
    ctx.fill();
    // bot
    ctx.fillStyle = colors[3];
    ctx.beginPath();
    ctx.moveTo(tile.left + (tile.width / 2), tile.top + (tile.height / 2));
    ctx.lineTo(tile.left + tile.width, tile.top + tile.height);
    ctx.lineTo(tile.left, tile.top + tile.height);
    ctx.fill();
    //border
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(tile.left, tile.top);
    ctx.lineTo(tile.left + tile.width, tile.top);
    ctx.lineTo(tile.left + tile.width, tile.top + tile.height);
    ctx.lineTo(tile.left, tile.top + tile.height);
    ctx.lineTo(tile.left, tile.top);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.moveTo(tile.left, tile.top);
    ctx.lineTo(tile.left + tile.width, tile.top + tile.height);
    ctx.moveTo(tile.left + tile.width, tile.top);
    ctx.lineTo(tile.left, tile.top + tile.height);
    ctx.stroke();
}