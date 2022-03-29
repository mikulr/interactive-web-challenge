// Fetch the JSON data, console log it 
d3.json("samples.json").then((data) => {
        console.log(data);
    });



//set initial value in dropdown which will fill in the initial charts  
function opening() {
    // Grab a reference to the dropdown select element
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        let names = data.names;
        // for each name in sample name list give the dropdown an option, some text and a value 
        names.forEach((name) => {
            dropdown.append("option")
                .text(name)
                .property("value", name);
        });
        console.log("Names:", names)
        // Use the first sample from the list to build the initial plots ()
        let openingSample = names[0];
        console.log(openingSample)
        createPlotly(openingSample);
    });
}

opening();


function createPlotly(sample) {

    d3.json("samples.json").then((data) => {
        // narrow down our datasets to just include our desired sample to plot
        // First take the json and break out arrays 
        let sampleSet = data.samples;
        let metaDataSet = data.metadata;
        //Confirm and use as ref
        console.log("sampleSet", sampleSet);
        console.log("metaset", metaDataSet);

        //filter down to just the one we want
        //Both return a list of one, grab [0] to get the actual data inside it
        let chosenSample = sampleSet.filter(obj => obj.id == sample)[0];
        let chosenSampleMeta = metaDataSet.filter(obj => obj.id == sample)[0];

        console.log("chosenSample", chosenSample);
        console.log("metaSample", chosenSampleMeta);

        //Create the Bar Chart using chosen sample
        // Initially I used this line as the y in the trace below 
        let idList = chosenSample.otu_ids.sort((a, b) => b.otu_ids - a.otu_ids).slice(0, 10).reverse()
        console.log("idList:", idList);
        // Just pulling the otu_ids is a bunch of numbers, which makes the bar not work
        // Run a loop to add text to the number which then means it displays cotrectly
        let formattedId= idList.map(i => "OTU-ID " + i)
        console.log("formattedId:", formattedId);

        
        let trace1 = {
            x: chosenSample.sample_values.sort((a, b) => b.sample_values - a.sample_values).slice(0, 10).reverse(),
            y: formattedId,
            text: chosenSample.otu_labels.sort((a, b) => b.otu_labels - a.otu_labels).slice(0, 10).reverse(),
            name: "",
            type: "bar",
            orientation: "h"
        };
        console.log("trace1;", trace1)
        let traceData = [trace1];

        let config = {responsive: true};
   
        Plotly.newPlot("bar", traceData, config);

        /// Create Bubble Chart using chosen sample
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


        //Metadata Box
        //Write my loop to pull pairs of data and confirm in console
        for (var key in chosenSampleMeta) {
            console.log(key, chosenSampleMeta[key]);}
        // Add a table class and tbody tags to index.html and call that here
        let tbody = d3.select("tbody");
        // Run Loop
        for (var key in chosenSampleMeta){
            // Append one table row per pair
            var row = tbody.append("tr");
            // append one cell for the key and one cell for the value
            row.append("td").text(key);
            row.append("td").text(chosenSampleMeta[key]);
          };
        });
}
    

// This function is called when a dropdown menu item is selected
function optionChanged() {
    // Use D3 to select the dropdown menu
    dropdown = d3.select("#selDataset");
    // When it changes 
    dropdown.on("change");
    // Grab the new vaule in the selector, call it update sample
    updateSample = dropdown.property("value");
    //Send that secection to createPlotly which will update the values for the images  
   // additonally, clear the rows from the metadata table, otherwise it stacks on top
    d3.selectAll('tr').remove()
    createPlotly(updateSample);
};


