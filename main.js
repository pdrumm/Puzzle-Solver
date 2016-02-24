// TODO:
/*
1. SUGGESTION under Tile constructor
2. IDEA under transitions def.
3. UNDEFINED: figure out the undefined error
 */

/* Machine M */

// Colors availible
var colors = ['r', 'y', 'g' ,'b'];

// Set of states
var states = colors;

// Alphabet
var sigma = [];
var i, j;

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
        /*
        SUGGESTION: have an array of 4 colors rather than a
        variable for each, b/c the position is arbitrary.
        ie. We can always rotate tiles.
        I added the colors array, so just get rid of the top 4 vars?
         */
        left: cleft,
        right: cright,
        top: ctop,
        bot: cbot,
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

// Delta - transition function
// Transition will be (top,bottom)
// Dictionary of dictionaries ==> key: current state, inner_key: color_pair / state transition (top,bottom), value: next state
var transitions = {
    /*IDEA: the machine M we built for the homework only tells IF we solved
    the puzzle or not. It didn't tell us the pieces we used to solve it (which
    could vary if we're allowing the solution to use a puzzle piece more than
    once). So one idea is that we could potentially store the PUZZLE PIECE (and
    orientation?) used to generate each state. Then, we could associate the
    winning transitions with the specific puzzle pieces used.
    */

};
// testing dictionary truthiness
/*if(transitions.b){console.log("b is true");
}else{console.log("b is false");}
if(transitions.c){console.log("c is true");
}else{console.log("c is false");}
if(transitions.b.bb){console.log("b.bb is true");
}else{console.log("b.bb is false");}
if(transitions.b.cc){console.log("b.cc is true");
}else{console.log("b.cc is false");}*/
var tile_count = tiles.length;
var tile_seg_count = tiles[0].colors.length;
for( i=0; i<tile_count; i++ ){
    for ( j=1; j<=tile_seg_count; j++ ){
        if(transitions[tiles[i].colors[j%tile_seg_count]]){
        // if tile1.b exists
            if(transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]]){
            // if tile1.b.ry exists
                transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]].push(tiles[i].colors[(j+2)%tile_seg_count]);
            } else {
            // if tile1.b exists, but tile.b.ry does not exist
                transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]] = [];
                transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]].push(tiles[i].colors[(j+2)%tile_seg_count]);
            }
        } else {
        // if tile1.b does not exist
            transitions[tiles[i].colors[j%tile_seg_count]] = {};
            transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]] = [];
            transitions[tiles[i].colors[j%tile_seg_count]][tiles[i].colors[(j+1)%tile_seg_count]+tiles[i].colors[(j-1)%tile_seg_count]].push(tiles[i].colors[(j+2)%tile_seg_count]);
        }
    }
}
//TESTING adding to dict via variables
/*var x = 'c';
var y = 'bb';
transitions.b.bg = 'b';
transitions[x] = {};
transitions[x][y] = 'x';
transitions[x]['zz'] = '2';
*/
console.log(transitions);
// Start State
var start = my_frame.left;

// Final State Set
var accept = my_frame.right;

var my_tile = Tile('g','b','b','b');
