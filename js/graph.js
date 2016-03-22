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
                'content': 'data(id)',
                'background-color': '#999',
                'text-valign': 'center',
                'color': 'white',
                'text-outline-width': 2,
                'text-outline-color': '#888'
            })
            .selector('.accept')
            .css({
                'border-color': '#FF3679',
                'border-width': 4
            })
            .selector('edge')
            .css({
                'label': 'data(label)',
                'target-arrow-shape': 'triangle',
                'width': 5,
                'line-color': '#ddd',
                'target-arrow-color': '#ddd',
                'control-point-step-size' : 90,
                'edge-text-rotation': 'autorotate'
            })
            .selector('.first_node')
            .css({
                'background-color': '#33FF94',
                'color': '#33FF94'
            })
            .selector('.highlighted')
            .css({
                'background-color': '#cc33ff',
                'line-color': '#cc33ff',
                'target-arrow-color': '#cc33ff',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s',
                'z-index': 2
            })
            .selector('.un_highlighted')
            .css({
                'background-color': '#999',
                'line-color': '#ddd',
                'target-arrow-color': '#ddd',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s',
                'z-index': 0
            })
            .selector('.marked')
            .css({
                'background-color': '#3cc',
                'line-color': '#3cc',
                'target-arrow-color': '#3cc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s',
                'z-index': 1
            })
            .selector('.start_edge')
            .css({
                'width': 0,
                'background-color': '#3cc',
                'line-color': '#3cc',
                'target-arrow-color': '#3cc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            })
            .selector('.start_node')
            .css({
                'background-color': '#33FF94',
                'width': 50,
                'height': 50
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
    var multigraph = json[3];
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
                        if(multigraph){
                            cy_elems.push({
                                group: "edges",
                                data: {
                                    id: state_1 + trans.replace(" ","") + state_2,
                                    weight: 2,
                                    source: state_1,
                                    target: state_2,
                                    label: trans
                                }
                            });
                        } else {
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
    }
    cy_elems.push({group: "nodes", data: {id: "Click-to-Start"}});
    cy_elems.push({
        group: "edges",
        data: {
            id: "start_edge",
            weight: 2,
            source: "Click-to-Start",
            target: next_state[0]
        }
    });
    cy.add(cy_elems);
    cy.$('#start_edge').addClass('start_edge');
    cy.$('#Click-to-Start').addClass('start_node');

    cy.layout({
        name: 'circle',
        directed: true,
        padding: 10
    });


    var path_l = [];
    path_l.push(cy.$('#Click-to-Start'));
    path_l.push(cy.$('#start_edge'));

    if(multigraph){
        for(i=0;i<transitions.length;i++){
            path_l.push(cy.$('#'+next_state[i]));
            path_l.push(cy.$('#'+next_state[i]+transitions[i].replace(" ","")+next_state[i+1]));
        }
    } else {
        for(i=0;i<transitions.length;i++){
            path_l.push(cy.$('#'+next_state[i]));
            path_l.push(cy.$('#'+next_state[i]+next_state[i+1]));
        }
    }
    path_l.push(cy.$('#'+next_state[i]));


    i = 0;
    var highlightNextEle = function(path){
        if( i < path.length ){
            path[i].addClass('highlighted');
            path[i].removeClass('marked');
            path[i].removeClass('un_highlighted');
            if(i === 1){
                path[i].addClass('highlighted');
                path[i].removeClass('un_highlighted');
                path[i].removeClass('start_edge');
                path[2].addClass('first_node')
            }
            if(i === 3){
                //hide again
                path[1].removeClass('highlighted');
                path[1].addClass('start_edge');
            }
            if((i-1)%2 === 1){
                path[i-1].addClass('marked');
                path[i-1].removeClass('highlighted');
                path[i-1].removeClass('un_highlighted');
                path[i-2].addClass('marked');
                path[i-2].removeClass('highlighted');
                path[i-2].removeClass('un_highlighted');
            }

            i++;
            setTimeout(highlightNextEle, 1000, path);
        } else {
            path[i-1].addClass('marked');
            path[i-1].removeClass('highlighted');
            path[i-1].removeClass('un_highlighted');
            path[i-1].addClass('accept');
            i=0;
        }
    };
    var unhighlightAll = function(path){
        cy.$('.accept').removeClass('accept');
        cy.$('.first_node').removeClass('first_node');
        for(i=0;i<path.length;i++){
            path[i].addClass('un_highlighted');
            path[i].removeClass('highlighted');
            path[i].removeClass('marked');
        }
        i=0;
    };

// kick off first highlight
    cy.$("#Click-to-Start").on("tap",function(){
        unhighlightAll(path_l);
        highlightNextEle(path_l);

        // print accepted string to div
        var item, trans_str;
        $("#path_div").html("");
        $("#path_div").append("<i>ACCEPTED STRING:</i> ");
        for (item in transitions) {
            console.log(item);
            if (item == 0) {
                trans_str = transitions[item];
            } else {
                trans_str = " | " + transitions[item];
            }
            $("#path_div").append(trans_str);
        }
    });

}); // on dom ready