/**
 * Created by Patrick on 3/21/2016.
 */
$(function(){ // on dom ready

    var cy = cytoscape({
        container: document.getElementById('nfa_graph'),

        boxSelectionEnabled: false,
        autounselectify: true,

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'content': 'data(id)'
            })
            .selector('edge')
            .css({
                'label': 'data(label)',
                'target-arrow-shape': 'triangle',
                'width': 4,
                'line-color': '#ddd',
                'target-arrow-color': '#ddd',
                'edge-text-rotation': 'autorotate'
            })
            .selector('.highlighted')
            .css({
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                'target-arrow-color': '#61bffc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            }),

        elements: {
            nodes: [],

            edges: []
        },

        layout: {
            name: 'null'
        }
    });

    var json = decodeURIComponent(window.location.search);
    json = json.replace(/\+/g," ");
    json = json.replace(/^.*=/,"");
    json = JSON.parse(json);
    console.log(json);
    var obj, json_nodes=[];
    for(obj in json) {
        if (json.hasOwnProperty(obj)) {
            json_nodes.push(obj);
        }
    }
    console.log(json_nodes);

    var i= 0, cy_elems=[],j=0;
    for(i=0; i<json_nodes.length; i++) {
        cy_elems.push({group: "nodes", data: {id: json_nodes[i]}});
    }
    var state_1,state_2,trans,edge_exists;
    for(state_1 in json) {
        if (json.hasOwnProperty(state_1)) {
            for(trans in json[state_1]) {
                if (json[state_1].hasOwnProperty(trans)) {
                    json[state_1][trans] = jQuery.unique(json[state_1][trans]);
                    for(j=0;j<json[state_1][trans].length;j++) {
                        state_2 = json[state_1][trans][j];
                        edge_exists = -1;
                        for (i = 0; i < cy_elems.length; i++) {
                            if (cy_elems[i]["data"]["id"] === (state_1 + state_2)) {
                                edge_exists = i;
                            }
                        }
                        if (edge_exists > -1) {
                            cy_elems[edge_exists]["data"]["label"] += (", " + trans);
                        } else {
                            cy_elems.push({
                                group: "edges",
                                data: {
                                    id: state_1 + state_2,
                                    weight: 2,
                                    source: state_1,
                                    target: state_2,
                                    label: trans
                                }
                            });
                        }
                    }
                }
            }
        }
    }
    cy.add(cy_elems);

    cy.layout({
        name: 'circle',
        directed: true,
        roots: 'yellow',
        padding: 10
    });
    //};

    var bfs = cy.elements().bfs('#a', function(){}, true);

    var i = 0;
    var highlightNextEle = function(){
        if( i < bfs.path.length ){
            bfs.path[i].addClass('highlighted');

            i++;
            setTimeout(highlightNextEle, 1000);
        }
    };

// kick off first highlight
    highlightNextEle();

}); // on dom ready