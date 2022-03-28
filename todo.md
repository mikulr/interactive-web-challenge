import data

establish starting ID value for all graphs

populate dropdown with id's

use the initial id as openingSample to 

FUNCTION drawplots (for sample that will be passed in from dropdown)
    How to get to 

        metadata
            filter by id by matching  the "sample" with metadata.id
                grab metadata key : value
        
        bar
            filter by id by matching  the "sample" with samples.id
                sort by sample.sample_values
                slice first 10 off
                reverse
            x-reversed.otu_ids
            y- reversesd.sample_values
            lables- otu_labels
        
        bubble
            https://plotly.com/javascript/bubble-charts/
            filter by id by matching  the "sample" with samples.id
            x: [otu_ids],
            y: [sample_values],
            text: [otu_labels]
            mode: "markers",
             marker: {
                  color: [otu_ids],
    size: [sample_values]
  }

    bonus- gauge



watch the dropdown for change
FUNCTION on change set sample
    trigger draw function

FUNCTION redraw plots with newId
    can this function call first function with new variable as id
