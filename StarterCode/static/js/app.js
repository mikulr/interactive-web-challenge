// Fetch the JSON data, console log it 
d3.json("samples.json")
    .then((data) => {
        console.log(data);
    });



//set initial value in dropdown which will fill in the initial charts  
function opening() {
    // Grab a reference to the dropdown select element
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;

        sampleNames.forEach((sample) => {
            dropdown
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        let openingSample = sampleNames[0];
        console.log(openingSample)
        createPlotly(openingSample);
    });
}

opening();


function createPlotly(sample) {

    d3.json("samples.json").then((data) => {
        // narrow down our datasets to just include our desired sample to plot
        //define samples array
        let sampleSet = data.samples;
        console.log("set", sampleSet);
        //filter down to just the one we want- beacuse it returns a list of one, grab [0]
        let chosenSample = sampleSet.filter(obj => obj.id === sample)[0];
        console.log("chosen", chosenSample);

        //Create the Bar Chart
        /// NEEDS FORMATTING
        let trace1 = {
            x: chosenSample.sample_values.sort((a, b) => b.sample_values - a.sample_values).slice(0, 10).reverse(),
            y: chosenSample.otu_ids,
            text: chosenSample.otu_labels,
            type: "bar",
            orientation: "h"
        };
console.log(trace1)
        let traceData = [trace1];

        // let config = { responsive: true };
        var layout = {
            xaxis: {
                tickmode: "auto", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
                tickvals: chosenSample.sample_values,
                ticktext: chosenSample.otu_labels,
                showtickprefix: 'all',
                tickprefix: chosenSample.otu_labels,
            }
        }


        Plotly.newPlot("bar", traceData, layout);

        /// Create Bubble Chart
        ///NEEDS FORMATTING
        let trace2 = {
            x: chosenSample.otu_ids,
            y: chosenSample.sample_values,
            text: chosenSample.otu_labels,
            mode: "markers",
            marker: {
                color: chosenSample.otu_ids,
                size: chosenSample.sample_values
            }
        }

        let traceData2 = [trace2];
        // console.log(trace2)  

        let layout2 = {
            xaxis: {
                title: {
                    text: "OTU ID's",
                },
            },
        }
        Plotly.newPlot("bubble", traceData2, layout2);

        //Create MetaData Chart
        // narrow down our datasets to just include our desired sample to plot
        //define metadata array
        let metaDataSet = data.metadata;
        console.log("metaset", metaDataSet);
        //filter down to just the one we want-
        let chosenSampleMeta = metaDataSet.filter(obj => obj.id === sample);

        console.log("meta", chosenSampleMeta);

    })
}


// // Call createPlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", createPlotly);


// function optionChanged(updatedSample) {
//     // Fetch new data each time a new sample is selected
//     createPlotly(updatedSample);
// }


// This function is called when a dropdown menu item is selected
function optionChanged() {
    // Use D3 to select the dropdown menu
    dropdownMenu = d3.select("#selDataset");
    dropdownMenu.on("change", function () {
    updateSample = dropdownMenu.property("value");
    createPlotly(updateSample);
    });
}

// inputField.on("change", function() {
// //     var newText = d3.event.target.value;
// //     console.log(newText);
// //   });



// // //     createBar();