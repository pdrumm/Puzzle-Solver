/* Machine M */

// Colors availible
var colors = ['red', 'yellow', 'green' ,'blue'];

// Set of states
var states = colors;

// Alphabet
var sigma = [];
var i, j;
// create an alphabet that consists of all pairs of colors (ie. 'rr','ry','rg','yr',...)
for (i = 0 ; i < colors.length ; i++) {
    for (j = 0 ; j < colors.length ; j++) {
        sigma.push(colors[i] +" "+ colors[j]);
    }
}

// Frame Constructor
var Frame = function(size,tiles) {
    var i, my_pairs = [];
    if(tiles.length!==0) {
        for( i=0; i<size; i++ ){
            my_pairs.push(tiles[i].colors[1] +" "+ tiles[i].colors[3]);
        }
        return {
            left: tiles[0].colors[0],
            right: tiles[tiles.length-1].colors[2],
            pairs: my_pairs
        }
    } else {
        var pair = "";
        for( i=0; i<size; i++ ){
            pair = colors[Math.floor((Math.random() * colors.length))] +" "+ colors[Math.floor((Math.random() * colors.length))];
            my_pairs.push(pair);
        }
        return {
            left: colors[Math.floor((Math.random() * colors.length))],
            right: colors[Math.floor((Math.random() * colors.length))],
            pairs: my_pairs
        }
    }
};

// Tile Constructor
var Tile = function(cleft, ctop, cright, cbot) {
    return {
        colors: [cleft, ctop, cright, cbot]
    }
};
// Generate Tiles
function create_tiles(n) {
    var tiles = [], c = [];
    var i,j;
    for( i=0; i<n; i++ ){
        for( j=0; j<4; j++ ) {
            if(i>0 && j===0){
                c.push(tiles[i-1].colors[2]);
            } else {
                c.push(colors[Math.floor((Math.random() * colors.length))]);
            }
        }
        tiles.push(Tile(c[0],c[1],c[2],c[3]));
        c = [];
    }
    return tiles;
}

function shuffle (array) {
    var i = 0
        , j = 0
        , temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function rotate (array) {
    var shifted = Math.floor(Math.random()*array.length);
    for( i=0; i<shifted; i++ ){
        array.push(array.shift());
    }
    return array;
}
function mix_tiles(tiles){
    var i;
    for( i=0; i<tiles.length; i++ ){
        tiles[i] = rotate(tiles[i]);
    }
    shuffle(tiles);
}

function build_delta(tiles) {
    /*
     Delta - transition function
     'transitions' will be (top,bottom)
     Dictionary of dictionaries of arrays
     ==> key: current state, inner_key: color_pair / state transition (top,bottom), value: array of next states
     */
    var transitions = {};
    /*
     'parent_tile' is what we use to reconstruct the path taken to victory!
     This dictionary of dictionaries of dictionaries of objects is as follows...
     parent_tile[currentState][transition/symbol][nextState] === {i: tile #, j: counter-clockwise rotations}
     */
    var parent_tile = {};

    // Dynamically create 'transitions' and 'parent_tile'
    var tile_count = tiles.length;
    var tile_seg_count = tiles[0].colors.length;
    for (i = 0; i < tile_count; i++) {
        for (j = 1; j <= tile_seg_count; j++) {
            if (transitions[tiles[i].colors[j % tile_seg_count]]) {
                // if tile1.b exists
                if (transitions[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]]) {
                    // if tile1.b.ry exists
                    transitions[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]].push(tiles[i].colors[(j + 2) % tile_seg_count]);
                    parent_tile[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]][tiles[i].colors[(j + 2) % tile_seg_count]] = {
                        'i': i,
                        'j': j % tile_seg_count
                    };
                } else {
                    // if tile1.b exists, but tile.b.ry does not exist
                    transitions[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]] = [];
                    transitions[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]].push(tiles[i].colors[(j + 2) % tile_seg_count]);
                    parent_tile[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]] = {};
                    parent_tile[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]][tiles[i].colors[(j + 2) % tile_seg_count]] = {
                        'i': i,
                        'j': j % tile_seg_count
                    };
                }
            } else {
                // if tile1.b does not exist
                transitions[tiles[i].colors[j % tile_seg_count]] = {};
                transitions[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]] = [];
                transitions[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]].push(tiles[i].colors[(j + 2) % tile_seg_count]);
                parent_tile[tiles[i].colors[j % tile_seg_count]] = {};
                parent_tile[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]] = {};
                parent_tile[tiles[i].colors[j % tile_seg_count]][tiles[i].colors[(j + 1) % tile_seg_count] +" "+ tiles[i].colors[(j - 1) % tile_seg_count]][tiles[i].colors[(j + 2) % tile_seg_count]] = {
                    'i': i,
                    'j': j % tile_seg_count
                };
            }
        }
    }
    return [transitions,parent_tile];
}

// Test if the frame is accepted!
function solve_path(state,transitions,accept,my_string,soln,parent_tile) {
    var string = my_string.slice(0);
    if(string.length===0){
        return (state===accept);
    }
    if (transitions[state]) {
        // if tile1.b exists
        if (transitions[state][string[0]]) {
            // if tile1.b.ry exists
            var transition_taken = string.shift();
            var trans;
            for( trans=0; trans<transitions[state][transition_taken].length; trans++ ){
                if(solve_path(transitions[state][transition_taken][trans],transitions,accept,string,soln,parent_tile)){//use slice(0) as a cheat to pass array by value
                    soln.unshift(parent_tile[state][transition_taken][transitions[state][transition_taken][trans]]);
                    return true;
                }
            }
            return false;
        } else {
        // there are no transitions out of state for the next symbol of the string inputted
            return false;
        }
    } else {
    // there are no transitions out of this state
        return false;
    }
}

// test output
//function for checking if user is right
function user_check(frame,tiles) { //inputs: the frame, and tiles array, but this time no reordering and no rotations
    var n = tiles.length;
    //check top bottom
    for(i=0; i<n; i++){
        if((tiles[i].colors[1]+" "+tiles[i].colors[3])!==frame.pairs[i]) {
            return false;
        }
    }
    //check frame
    if((tiles[0].colors[0] !== frame.left) || (tiles[n-1].colors[2] !== frame.right)){
        return false;
    }
    //check side, side
    for(i=0; i<(n-1); i++){
        if(tiles[i].colors[2]!==tiles[i+1].colors[0]){
            return false;
        }
    }
    //all possible checked so return true
    return true;
}
//console.log(transitions);
//console.log(parent_tile);
/*
console.log(solve_path(start,my_frame.pairs));
console.log(soln);
console.log(tiles);
console.log(my_frame);

console.log(user_check(my_frame,tiles));
*/

function clear_canvas() {
    $('canvas').remove();
}

function generate_tiles(puz_size) {
    clear_canvas();
    var tiles = create_tiles(puz_size);
    var my_frame = Frame(puz_size, tiles);
    // Start State
    var start = my_frame.left;
    // Final State Set
    var accept = my_frame.right;
    mix_tiles(tiles);
    var objs = build_delta(tiles);
    var transitions = objs[0];
    var parent_tile = objs[1];
    var soln = [];
    console.log(solve_path(start, transitions, accept, my_frame.pairs, soln, parent_tile));

    drawFrame(my_frame, 20, 50, 20);
    var i;
    for (i = 0; i < puz_size; i++) {
        drawTile(tiles[i], 20, i, 50, 20);
    }

    drawFrame(my_frame, 20, 200, 20);
    console.log(transitions);
}