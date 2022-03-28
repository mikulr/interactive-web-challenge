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
            y: chosenSample.otu_ids.sort((a, b) => b.otu_ids - a.otu_ids).slice(0, 10).reverse(),
            text: chosenSample.otu_labels.sort((a, b) => b.otu_labels - a.otu_labels).slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };

        let traceData = [trace1];

        let config = { responsive: true };
        var layout = {
            yaxis: {
              tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
            //   tickvals: [1, 3, 5, 7, 9, 11],
            //   ticktext: ['One', 'Three', 'Five', 'Seven', 'Nine', 'Eleven']
            }
          }
          

        Plotly.newPlot("bar", traceData, layout, config);

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
        
        let layout2 =  {xaxis: {
            title: {
              text: "OTU ID's",
            },
          },}
        Plotly.newPlot("bubble", traceData2, layout2);

        //Create MetaData Chart
        // narrow down our datasets to just include our desired sample to plot
        //define metadata array
        let metaDataSet = data.metadata;
        console.log("metaset", metaDataSet);
        //filter down to just the one we want-
        let chosenSampleMeta = metaDataSet.filter(obj => obj.id === sample);
        console.log(sample);
        console.log("meta", chosenSampleMeta);

    })
}


// firstPlotly();

// function optionChanged(updatedSample) {
//     // Fetch new data each time a new sample is selected
//     createPlotly(updatedSample);
// }



// // // Call updatePlotly() when a change takes place to the dropdown
// // // d3.selectAll("#selDataset").on("change", updatePlotly);

// // // // // // This function is called when a dropdown menu item is selected
// // // // // function updatePlotly() {
// // // // //     // Use D3 to select the dropdown menu
// // // // //     var dropdownMenu = d3.select("#selDataset");
// // // // //     // Assign the value of the dropdown menu option to a variable
// // // // //     var dataset = dropdownMenu.property("value");






// // //     createBar();