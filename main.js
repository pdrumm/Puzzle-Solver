// TODO:
/*
1. IDEA under transitions def.
 */

/* Machine M */

// Colors availible
var colors = ['r', 'y', 'g' ,'b'];

// Set of states
var states = colors;

// Alphabet
var sigma = [];
var i, j;
// create an alphabet that consists of all pairs of colors (ie. 'rr','ry','rg','yr',...)
for (i = 0 ; i < colors.length ; i++) {
    for (j = 0 ; j < colors.length ; j++) {
        sigma.push(colors[i] + colors[j]);
    }
}

// Frame Constructor
var Frame = function(size) {
    return {
        left: 'b',
        right: 'r',
        pairs: ['gb','gb','bg','bg']
    }
};

// Tile Constructor
var Tile = function(cleft, ctop, cright, cbot) {
    return {
        colors: [cleft, ctop, cright, cbot]
    }
};

// Generate Frame
my_frame = Frame(4);

// Generate Tiles
var tile1 = Tile('b','g','b','b');
var tile2 = Tile('b','g','y','b');
var tile3 = Tile('y','b','r','g');
var tile4 = Tile('r','b','r','g');
var tiles = [tile1, tile2, tile3, tile4];

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
for( i=0; i<tile_count; i++ ){
    for ( j=1; j<=tile_seg_count; j++ ){
        if(transitions[tiles[i].colors[j%tile_seg_count]]){
        // if tile1.b exists
            if(transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]]){
            // if tile1.b.ry exists
                transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]].push(tiles[i].colors[(j+2)%tile_seg_count]);
                parent_tile[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]][tiles[i].colors[(j+2)%tile_seg_count]] = {'i':i,'j':j%tile_seg_count};
            } else {
            // if tile1.b exists, but tile.b.ry does not exist
                transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]] = [];
                transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]].push(tiles[i].colors[(j+2)%tile_seg_count]);
                parent_tile[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]] = {};
                parent_tile[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]][tiles[i].colors[(j+2)%tile_seg_count]] = {'i':i,'j':j%tile_seg_count};
            }
        } else {
        // if tile1.b does not exist
            transitions[tiles[i].colors[j%tile_seg_count]] = {};
            transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]] = [];
            transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]].push(tiles[i].colors[(j+2)%tile_seg_count]);
            parent_tile[tiles[i].colors[j%tile_seg_count]] = {};
            parent_tile[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]] = {};
            parent_tile[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]][tiles[i].colors[(j+2)%tile_seg_count]] = {'i':i,'j':j%tile_seg_count};
        }
    }
}

// Start State
var start = my_frame.left;

// Final State Set
var accept = my_frame.right;


// Test if the frame is accepted!
var soln = [];
function solve_path(state,string) {
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
                if(solve_path(transitions[state][transition_taken][trans],string.slice(0))){//use slice(0) as a cheat to pass array by value
                    //console.log(state+"->"+transition_taken+"->"+transitions[state][transition_taken][trans]);
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
console.log(solve_path(start,my_frame.pairs));
console.log(soln);