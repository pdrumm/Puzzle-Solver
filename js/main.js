/* Machine M */

// Colors availible
/*Since we based the rest of the code off of this array - colors - we may add as many new colors as we want
* to create different puzzles by simply adding HTML-recognized colors to this array*/
var colors = ['#FF0000', 'yellow', 'green' ,'blue'];

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
    /* This is a constructor which creates a solved frame based on the set of tiles already present*/
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

// User Frame Constructor
var UserFrame = function (size,string) {
    /*This constructor creates a frame based off of a user-inputted string*/
    var i;
    var num_squares = (size / 2) - 1;
    var left = string[0];
    var right = string[num_squares+1];
    var my_pairs = [];
    for (i = 1 ; i <= num_squares ; i++) {
        my_pairs.push(string[i] +" "+ string[((2*num_squares) - i + 2)]);
    }
    return {
        left: left,
        right: right,
        pairs: my_pairs
    }
};

// Tile Constructor
var Tile = function(cleft, ctop, cright, cbot) {
    /*Tile object constructor which applies 4 parameters as the respective color quadrant*/
    return {
        selected: false,
        colors: [cleft, ctop, cright, cbot]
    }
};
//Generate User Tiles
function create_user_tiles(s) {
    /*Creates a set of tiles based on a user-inputted string*/
    var tiles = [], c = [];
    if((s.length%4) === 0) {
        for (var i = 0; i < (s.length / 4); i++) {
            for (var j = 0; j < 4; j++) {
                c.push(s[(i*4) + j]);
            }
            tiles.push(Tile(c[0], c[1], c[2], c[3]));
            c = [];
        }
    } else {
        tiles = create_tiles(4); // default case: create a winning puzzle of 4 tiles
    }
    return tiles;
}
// Generate Tiles
function create_tiles(n) {
    /*Create a set of n random tiles*/
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
    /*Mixes up the elements of an array*/
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
    /*Used to rotate the tiles to get correct solutions and display the tiles correctly*/
    array_colors = array.colors;
    var shifted = Math.floor(Math.random()*array_colors.length), i;
    for( i=0; i<shifted; i++ ){
        array_colors.push(array_colors.shift());
    }
    return array_colors;
}
function mix_tiles(tiles){
    /*Function that rotates and mixes up the order of a set of tiles: uses rotate and shuffle*/
    var i;
    for( i=0; i<tiles.length; i++ ){
        tiles[i].colors = rotate(tiles[i]);
    }
    shuffle(tiles);
}

function build_delta(tiles) {
    /*This creates the transition function, delta, of the machine we are simulating with this program*/
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
function solve_path(state,transitions,accept,my_string,soln,parent_tile,trans_soln,next_state_soln) {
    /*Attempt to find a solution given tiles and a frame.
    * The function is called recursively in a way that models a depth first search:
    * The function will return the first true path it finds.
    * The function that stores the correct path in soln */
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
                if(solve_path(transitions[state][transition_taken][trans],transitions,accept,string,soln,parent_tile,trans_soln,next_state_soln)){//use slice(0) as a cheat to pass array by value
                    soln.unshift(parent_tile[state][transition_taken][transitions[state][transition_taken][trans]]);
                    next_state_soln.unshift(transitions[state][transition_taken][trans]);
                    trans_soln.unshift(transition_taken);
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

function clear_canvas() {
    /*Clears all elements that had previously been displayed on the screen*/
    var c = $('canvas.puzzle');
    console.log(c);
    c[0].getContext('2d').clearRect(0, 0, c[0].width, c[0].height);
    c[1].getContext('2d').clearRect(0, 0, c[1].width, c[1].height);
    c[2].getContext('2d').clearRect(0, 0, c[2].width, c[2].height);
    elements1 = [];
    elements2 = [];
    elements3 = [];
    $('#instructions').fadeIn();
}

function generate_tiles(puz_size,user_str, user_frame,show_soln,use_num) {
    /*The main function of the program. Calls functions to construct and solve a puzzle, and then calls
    * functions to display results to the screen*/
    var size = user_str.split(" ").length;
    var squares = size / 4;
    var frame_size = user_frame.split(" ").length;
    var my_frame;
    var tiles;
    clear_canvas();
    $('#instructions').fadeOut();
    if (use_num) { // create random puzzle with puz_size tiles
        tiles = create_tiles(puz_size);
        my_frame = Frame(puz_size, tiles);
    }
    else if (user_str !== "" && user_frame !== "") { // ensure proper user input
        if ((size % 4) === 0) {
            if (((squares * 2) + 2) === frame_size) { // ensure number of tiles and frame size match accordingly
                puz_size = size / 4;
                tiles = create_user_tiles(user_str.split(" "));
                my_frame = UserFrame(user_frame.split(" ").length, user_frame.split(" "));
            } else { // sizes incorrect
                clear_canvas();
                alert("Error: wrong frame size");
                return;
            }
        } else { // number of inputted colors cannot form a puzzle: Must be divisible by 4
            clear_canvas();
            var mystr = "Error: wrong tile size. Please either:";
            mystr += "\n  - remove "+(size%4).toString()+" colors from the Tile String" ;
            mystr += "\n    or\n  - add "+(4-(size%4)).toString()+" colors to the Tile String" ;
            alert(mystr);
            return;
        }
    } else if (user_str === "") { // no user input
        clear_canvas();
        alert("Error: Tile String is empty. Please input some colors, or check the 'Use Puzzle Size' box.");
        return
    } else if (user_frame === "") { // no user input
        clear_canvas();
        alert("Error: Frame String is empty. Please input some colors, or check the 'Use Puzzle Size' box.");
        return
    }

    // Start State
    var start = my_frame.left;
    // Final State Set
    var accept = my_frame.right;
    mix_tiles(tiles);

    var objs = build_delta(tiles);
    var transitions = objs[0];
    var parent_tile = objs[1];
    var soln = []; // initialize array to include tiles with proper orientations
    var trans_soln=[], next_state_soln=[];
    solved = solve_path(start, transitions, accept, my_frame.pairs, soln, parent_tile, trans_soln, next_state_soln); // find the solution
    // store data in hidden fields for the nfa
    next_state_soln.unshift(start);
    $('#nfa_graph').val(JSON.stringify(transitions));
    $('#nfa_transitions').val(JSON.stringify(trans_soln));
    $('#nfa_next_state').val(JSON.stringify(next_state_soln));
    clear_callback(my_frame,solved);

    if (solved) { // puzzle has solution: Display desired information
        if (show_soln) {
            drawFrame(my_frame, 20, 450, 20, "lvl3", true);
        }
        var i;
        //console.log(my_frame.pairs);
        drawFrame(my_frame, 20, 300, 20, "lvl2", false);
        for (i = 0; i < puz_size; i++) {
            pushTile(tiles[soln[i].i], 20, i, 0, 3, soln[i].j);//,soln[i].j);
            pushTile(tiles[i], 0, i, (20*2)/(puz_size-1),2,0);
        }
        if(show_soln) drawTiles(3); // user wants to view the solution
        drawTiles(2);

        drawFrame(my_frame, 20, 150, 20, "lvl1", true);
        // draw empties
        for (i = 0; i < puz_size; i++) {
            pushTile(Tile('white','white','white','white'), 20, i, 0, 1, 0);
        }
        drawTiles(1);

    } else { // puzzle is not solvable
        drawFrame(my_frame, 20, 150, 20, "lvl1", true);
        drawFrame(my_frame, 20, 300, 20, "lvl2", false);
        for (i = 0; i < puz_size; i++) {
            pushTile(tiles[i], 0, i, (20*2)/(puz_size-1),2);
            pushTile(Tile('white','white','white','white'), 20, i, 0, 1);
        }
        drawTiles(2);
        drawTiles(1);


        if (show_soln) { // user wants to see solution, but there is no solution
            drawFrame(my_frame, 20, 450, 20, "lvl3", true);
            print_unsolvable(document.getElementById("lvl3")); // display unsolvable message
        }

    }
}

$('#show_graph').on('click',function(e){
    if($('#nfa_graph').val()===""){
        e.preventDefault();
        alert("Please 'generate' a puzzle in order to see it's NFA.");
    }
    $('#nfa_multigraph').val(($('#multigraph')[0].checked));
});