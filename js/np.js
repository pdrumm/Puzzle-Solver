/**
 * Created by Patrick on 4/18/2016.
 */
// create data structures for tiles tile_dict is the dictionary of current tiles,
// list_1 is the list of tile in order of left, top, right, bottom
function createTiles(tile_dict,list_1){
    var num = tile_dict.length++;
    var storage = {
        0: {}, 1: {}, 2: {}, 3: {}
    };
    storage[0][list_1[0]+' '+list_1[1]] = list_1[2]+' '+list_1[3];
    storage[1][list_1[1]+' '+list_1[2]] = list_1[3]+' '+list_1[0];
    storage[2][list_1[2]+' '+list_1[3]] = list_1[0]+' '+list_1[1];
    storage[3][list_1[3]+' '+list_1[0]] = list_1[1]+' '+list_1[2];
    // tile # X now has the 4 rotations stored
    tile_dict[num] = storage;
}

function TreeNode(tile,orientation,depth,parent,frame) {
    if(depth===3){
        console.log(frame);
    }
    return {
        tile: tile,
        orientation: orientation,
        colors: {
            top: "",
            right: "",
            bottom: "",
            left: ""
        },
        frame: frame,
        depth: depth,
        children: [],
        parent: parent,
        nextColors: function() {
            return this.frame.left + ' ' + this.frame.top[depth % start_frame.width];
        },
        addChildren: function() {
            for(tile in tile_dict){
                for(orientation in tile_dict[tile]){
                    if( this.nextColors() in tile_dict[tile][orientation] ){
                        if(this.depth===3){console.log(this.nextColors())};
                        if(this.depth===3){console.log("!!!!!!!!!!!!!!!!!!")};
                        if(
                            (
                                // right column of puzzle, but not bottom row
                                (this.depth+1)%start_frame.width===0
                                && Math.floor(this.depth/start_frame.width)!==start_frame.height-1
                                && tile_dict[tile][orientation][this.nextColors()].split(' ')[0]===this.frame.right
                            )
                            ||
                            (
                                // bottom row of puzzle, but not right column
                                Math.floor(this.depth/start_frame.width)===start_frame.height-1
                                && (this.depth+1)%start_frame.width!==0
                                && tile_dict[tile][orientation][this.nextColors()].split(' ')[1]===start_frame.bottom[(this.depth)%start_frame.width]
                            )
                            ||
                            (
                                // bottom row of puzzle and right column
                                Math.floor(this.depth/start_frame.width)===start_frame.height-1
                                && (this.depth+1)%start_frame.width===0
                                && tile_dict[tile][orientation][this.nextColors()].split(' ')[0]===this.frame.right
                                && tile_dict[tile][orientation][this.nextColors()].split(' ')[1]===start_frame.bottom[(this.depth)%start_frame.width]
                            )
                            ||
                            (
                                // neither bottom row nor right column of puzzle
                                ((this.depth+1)%start_frame.width!==0
                                && Math.floor(this.depth/start_frame.width)!==start_frame.height-1)
                                || this.depth===0
                            )
                        ) {
                            if(this.depth===3) {
                                console.log("?????????????????");
                            }
                            this.children.push(TreeNode(tile, orientation, this.depth + 1, this, this.new_frame(tile, orientation)));
                        }
                    }
                }
            }
        },
        new_frame: function(tile,orientation) {
            var top, right, bottom, left;
            var pos = this.depth % start_frame.width;
            bottom = this.frame.bottom.slice();
            bottom[pos] = tile_dict[tile][orientation][this.nextColors()].split(' ')[1];
            right = this.frame.right;
            left = tile_dict[tile][orientation][this.nextColors()].split(' ')[0];
            top = this.frame.top.slice();

            if( pos===2 && this.depth!==0 ){
                // were starting a new line
                left = start_frame.left[Math.floor((this.depth+1)/start_frame.width)];
                right = start_frame.right[Math.floor((this.depth+1)/start_frame.width)];
                top = bottom.slice();
            }

            return {
                top: top,
                bottom: bottom,
                left: left,
                right: right
            }
        }
    };
}

var tile1 = ['green', 'red', 'green', 'blue'];
var tile2 = ['green', 'blue', 'yellow', 'red'];
var tile3 = ['yellow', 'green', 'red', 'yellow'];
var tile4 = ['red', 'blue', 'yellow', 'yellow'];
var tile_dict = {};
tile_dict.length = 0;
createTiles(tile_dict,tile1);
createTiles(tile_dict,tile2);
createTiles(tile_dict,tile3);
createTiles(tile_dict,tile4);

var start_frame = {
    "top": ["red","blue","green"],
    "bottom":["green","blue","green"],
    "left":["green","red","red"],
    "right":["red","red","blue"],
    width: 3,
    height: 3
};
var current_frame = {
    "top": ["red","blue","green"],
    "left": "green",
    "right": "red",
    "bottom": []
};

function wrapper(){
    var root = TreeNode(null,null,0,null,current_frame);
    root.colors.left = current_frame.left;
    root.colors.top = current_frame.top[0];
    root.frame = current_frame;
    solve(root);
}

function solve(node){
    console.log(node.depth);
    console.log(node.tile+', '+node.orientation);
    node.addChildren();
    node.children.forEach(function(child){
        solve(child);
    });
}

wrapper();
//console.log(tile_dict);