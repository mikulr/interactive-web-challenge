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
        // First take the json and break oout arrays 
        let sampleSet = data.samples;
        let metaDataSet = data.metadata;
        //Confirm and use as ref
        console.log("sampleSet", sampleSet);
        console.log("metaset", metaDataSet);

        //filter down to just the one we want
        //Samples returns a list of one, grab [0] to get the actual data inside it
        let chosenSample = sampleSet.filter(obj => obj.id === sample)[0];
        //Metadata needs two= not three because WHY DID THAT WORK DIFFERENTLY???
        let chosenSampleMeta = metaDataSet.filter(obj => obj.id == sample)[0];

        console.log("chosenSample", chosenSample);
        console.log("metaSample", chosenSampleMeta);

        //Create the Bar Chart using chosen sample
        /// NEEDS FORMATTING
        let trace1 = {
            x: chosenSample.sample_values.sort((a, b) => b.sample_values - a.sample_values).slice(0, 10).reverse(),
            // y: chosenSample.otu_ids,
            text: chosenSample.otu_labels,
            name: "OTU Counts",
            type: "bar",
            orientation: "h"
        };
        console.log(trace1)
        let traceData = [trace1];

        let config = { responsive: true };
        var layout = {

            yaxis: {
                tickmode: 'linear',
                // showtickprefix: 'all',
                // tickprefix: ' OTU ID ',
                ticktext: "OTU ID ${chosenSample.otu_ids}",
                // autotick: false,
                ticks: 'outside',

                ticklen: 4,
                tickwidth: 4,
                tickcolor: '#000'
            }
        };


        Plotly.newPlot("bar", traceData, layout, config);

        /// Create Bubble Chart using chosen sample
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


        // //Metadata Box
        let tbody = d3.select("tbody");

        for (var key in chosenSampleMeta){

            // Append one table row per student/grade
            var row = tbody.append("tr");
          
            // append one cell for the student and one cell for the grade
            row.append("td").text(key);
            row.append("td").text(chosenSampleMeta[key]);
          };
        })

        // for (var key in chosenSampleMeta) {
        //     console.log(key, chosenSampleMeta[key]);






        }
    




// This function is called when a dropdown menu item is selected
function optionChanged() {
    // Use D3 to select the dropdown menu
    dropdownMenu = d3.select("#selDataset");
    // When it changes 
    dropdownMenu.on("change");
    // Grab the new vaule in the selector, call it update sample
    
    updateSample = dropdownMenu.property("value");
    //Send that secection to createPlotly which will update the values for the images  
   // additonally, clear the metadata otherwise it stacks on top
    d3.selectAll('tr').remove()
    createPlotly(updateSample);
};


