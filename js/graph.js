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
                'control-point-step-size' : 90,
                'edge-text-rotation': 'autorotate'
            })
            .selector('.highlighted')
            .css({
                'background-color': '#cc33ff',
                'line-color': '#cc33ff',
                'target-arrow-color': '#cc33ff',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            })
            .selector('.un_highlighted')
            .css({
                'background-color': '#3cc',
                'line-color': '#3dd',
                'target-arrow-color': '#3dd',
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
    json = json.split('&');
    for(i=0;i<json.length;i++) {
        json[i] = json[i].replace(/^.*=/, "");
    }
    for(i=0;i<json.length;i++) {
        json[i] = JSON.parse(json[i]);
    }
    var graph = json[0];
    var transitions = json[1];
    var next_state = json[2];
    console.log(json);

    var obj, json_nodes=[];
    for(obj in graph) {
        if (graph.hasOwnProperty(obj)) {
            json_nodes.push(obj);
        }
    }
    console.log(json_nodes);

    var i= 0, cy_elems=[],j=0;
    for(i=0; i<json_nodes.length; i++) {
        cy_elems.push({group: "nodes", data: {id: json_nodes[i]}});
    }
    var state_1,state_2,trans,edge_exists;
    for(state_1 in graph) {
        if (graph.hasOwnProperty(state_1)) {
            for(trans in graph[state_1]) {
                if (graph[state_1].hasOwnProperty(trans)) {
                    graph[state_1][trans] = jQuery.unique(graph[state_1][trans]);
                    for(j=0;j<graph[state_1][trans].length;j++) {
                        state_2 = graph[state_1][trans][j];
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

    //var bfs = cy.elements().bfs('#a', function(){}, true);

    var path_l = [];
    for(i=0;i<transitions.length;i++){
        path_l.push(cy.$('#'+next_state[i]));
        path_l.push(cy.$('#'+next_state[i]+next_state[i+1]));
        //path_l.push(cy.$('#'+transitions[i].replace(" ","")));
    }
    path_l.push(cy.$('#'+next_state[i]));

    i = 0;
    var highlightNextEle = function(path){
        if( i < path.length ){
            path[i].addClass('highlighted');
            path[i].removeClass('un_highlighted');

            if((i-1)%2 === 1){
                path[i-1].addClass('un_highlighted');
                path[i-1].removeClass('highlighted');
                path[i-2].addClass('un_highlighted');
                path[i-2].removeClass('highlighted');
            }

            i++;
            setTimeout(highlightNextEle, 1000, path);
        } else {
            path[i-1].addClass('un_highlighted');
            path[i-1].removeClass('highlighted');
        }
    };

// kick off first highlight
    highlightNextEle(path_l);

}); // on dom ready