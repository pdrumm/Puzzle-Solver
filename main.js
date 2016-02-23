/**
 * Created by Ryan on 2/23/2016.
 */

/**
 * Created by Ryan on 2/23/2016.
 */

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
        left: cleft,
        right: cright,
        top: ctop,
        bot: cbot
    }
};

// Generate Frame
my_frame = Frame(4);

// Generate Tiles

var tile1 = Tile('b','g','b','b');
var tile2 = Tile('b','g','y','b');
var tile3 = Tile('y','b','r','g');
var tile4 = Tile('r','b','r','g');

// Delta - transition function
// Transition will be (top,bottom)
// Dictionary of dictionaries ==> key: current state, inner_key: color_pair / state transition (top,bottom), value: next state
var transitions = {
    b: {
        'bb': 'g',
        'by': 'g'
    }
};

console.log(transitions.b.by);

// Start State
var start = my_frame.left;

// Final State Set
var accept = my_frame.right;

var my_tile = Tile('g','b','b','b');
