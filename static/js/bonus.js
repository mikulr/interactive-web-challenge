        //GAUGE PLOT
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: chosenSampleMeta.wfreq,
                title: { text: "Bellybutton Wash Count" },
                type: "indicator",
                mode: "gauge",
                gauge: {
                    axis: {
                        range: [0, 10],
                        visible: false,
                        // tickmode: "array",
                        // tickvals: [2, 3, 4, 5, 6, 7, 8, 9],
                        // ticks: "inside"
                    },
                    // steps: [
                    //     { range: [0, 1], color: "lightgray" },
                    //     { range: [1, 2], color: "mediumgrey" },
                    //     { range: [2, 3], color: "blue" },
                    //     { range: [3, 4], color: "red" },
                    //     { range: [4, 5], color: "green" },
                    //     { range: [5, 6], color: "orange" },
                    //     { range: [6, 7], color: "purple" },
                    //     { range: [7, 8], color: "yellow" },
                    //     { range: [8, 9], color: "gray" },
                    // ],
                    threshold: {
                        line: { color: "red", width: 10 },
                        thickness: 0.75,
                        value: chosenSampleMeta.wfreq
                    },
                    text: ['ML5', 'ML4', 'ML3', 'ML2',
                        'ML1', ''],
                    textinfo: 'text',
                    textposition: 'inside',
                    marker: {
                        colors: ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                            'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                            'rgba(210, 206, 145, .5)',
                            'rgba(255, 255, 255, 0)']
                    },
                    labels: ['4.5-5', '3.5-4.49', '2.5-3.49', '1.5-2.49', '1-1.49'],
                }
            }
        ];

        // var theta = chosenSampleMeta.wfreq
        // var r = 0.09
        // var x_head = r * Math.cos(Math.PI / 180 * theta)
        // var y_head = r * Math.sin(Math.PI / 180 * theta)
        // Trig to calc meter point
        var degrees = 180 - ((chosenSampleMeta.wfreq*18) - 1) * 45;
        // alert(degrees);
        radius = .5;
        var radians = degrees * Math.PI / 180;
        var x_head = radius * Math.cos(radians);
        var y_head = radius * Math.sin(radians);

        // // Path: may have to change to create a better triangle
        // var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
        //     pathX = String(x),
        //     space = ' ',
        //     pathY = String(y),
        //     pathEnd = ' Z';
        // var path = mainPath.concat(pathX, space, pathY, pathEnd);

        // var layout = {
        //     shapes: [{
        //         type: 'path',
        //         path: path,
        //         fillcolor: '850000',
        //         line: {
        //             color: '850000'
        //         }
        //     }],
        //     title: 'Maturity Total Score 1-5',
        //     height: 500,
        //     width: 600,
        //     xaxis: {
        //         type: 'category', zeroline: false, showticklabels: false,
        //         showgrid: false, range: [-1, 1]
        //     },
        //     yaxis: {
        //         type: 'category', zeroline: false, showticklabels: false,
        //         showgrid: false, range: [-1, 1]
        //     }
        // };


        var layout = {
            xaxis: { range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false },
            yaxis: { range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false },
            showlegend: false,
            width: 600,
            height: 450,
            margin: { t: 0, b: 0 },
            annotations: [
                {
                    ax: 0.5,
                    ay: 0.3,
                    axref: 'x',
                    ayref: 'y',
                    x: x_head,
                    y: y_head,
                    xref: 'x',
                    yref: 'y',
                    showarrow: true,
                    arrowhead: 3,
                    arrowsize: 1,
                    arrowwidth: 4
                }
            ]
        };
        Plotly.newPlot('gauge', data, layout);