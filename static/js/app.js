
// Create initial bar graph
function init() {
   d3.json("/samples").then((metadata) => {
      
      // Objects of all samples
      var samples = metadata.samples

      // Set variables for the initial plot
      var firstSample = samples[0]
      
      var sampleOTUID = firstSample.otu_ids.slice(0,10).toString();
      var ids = sampleOTUID.toString();
      var labels = firstSample.otu_labels;
      var sampleOTUvalues = firstSample.sample_values.slice(0,10);
      var values = sampleOTUvalues.reverse()

      // Set up Plotly 
      var data = [{
         x: values,
         y: ids,
         text: labels,
         type: "bar",
         orientation: "h",
         marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.8,
         }
      }]

      layout = {
         title: "Sample OTU Data",
         xaxis: {title: "Sample OTU Values"},
         yaxis: {title: "Sample OTU IDs"}
      }
      
      Plotly.newPlot("bar", data, layout)
   })
}
init()
// Add dropdown elements
d3.json("/samples").then((metadata) => {
      
   // Objects of all samples
   var samples = metadata.samples;
   // console.log(samples);

   var select = d3.select("#selDataset");

   samples.map(records => {
      var option = select.append("option")
      
      var id = records.id;
      var value = option.text(id);

   })
})

// Create event Listener
d3.selectAll("#selDataset").on("change", function(event) {
   updateBar(event);
   buildMetaData(event);
   buildGauge(event);
});

// Update the bar graph based on selected value
function updateBar() {

   d3.json("/samples").then((metadata) => {
      
      // Objects of all samples
      var samples = metadata.samples;

      // Select dropdown values
      var dropdown = d3.select("#selDataset").property("value");

      // Filter Data that matches the dropdown value
      var filteredData = samples.filter(records => records.id == dropdown)
    
      // Select IDs, values, labels for plots
      filteredData.map(record => {
         var ids = record.otu_ids.slice(0,10).toString();
         var labels = record.otu_labels;
         var values = record.sample_values.slice(0,10).reverse();

         // Plotly
         var data = [{
            x: values,
            y: ids,
            text: labels,
            type: "bar",
            orientation: "h",
            marker: {
               color: 'rgb(158,202,225)',
               opacity: 0.8,
            }
         }]
   
         layout = {
            title: "Sample OTU Data",
            xaxis: {title: "Sample OTU Values"},
            yaxis: {title: "Sample OTU IDs"}
         }
         
         Plotly.newPlot("bar", data, layout)
      })
   })
}

// Create bubble chart
function buildChart() {
   d3.json("/samples").then((metadata) => {
      
      // Objects of all samples
      var samples = metadata.samples;

      // // Select dropdown values
      // var dropdown = d3.select("#selDataset").property("value");

      // Select IDs, values and labels
      // console.log(samples)
      Object.entries(samples).forEach(([key, value]) => {
         // console.log(value)
         var sample_id = value.id;
         var otu_id = value.otu_ids;
         var otu_labels = value.otu_labels;
         var otu_values = value.sample_values;
         // console.log(otu_values)

         // Plotly
         var trace1 = {
            x: otu_id,
            y: otu_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: otu_values,
              color: otu_id,
              sizemode: 'area'
            },
            type: "scatter"
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Individual Sample Bubble Chart',
            showlegend: false,
            height: 450,
            width: 800
          };
          
          Plotly.newPlot('bubble', data, layout);
      })
   })
}
buildChart();

// Create interactive demographic metadata info
function buildMetaData() {
   d3.json("/samples").then((metadata) => {
      
      console.log(metadata)
      // select container id and clear the data inside
      var container = d3.select("#sample-metadata");
      container.html("")

      // Objects of all samples
      var metadata = metadata.metadata;
      // console.log(metadata)

      // Select dropdown values
      var dropdown = d3.select("#selDataset").property("value");

      // Filter data based on dropdown value
      var filteredData = metadata.filter(records => records.id == dropdown)
      // console.log(filteredData)

      filteredData.map(record => {
         var id = record.id;
         var age = record.age;
         var ethnicity = record.ethnicity;
         var gender = record.gender;
         var location = record.location;
         var wfreq = record.wfreq;

         // Add list to container
         var ul = container.append("ul");

         var li1 = ul.append("li").text(`ID: ${id}`);
         var li2 = ul.append("li").text(`Age: ${age}`);
         var li3 = ul.append("li").text(`Ethnicity: ${ethnicity}`);
         var li4 = ul.append("li").text(`Gender: ${gender}`);
         var li5 = ul.append("li").text(`Location: ${location}`);
         var li6 = ul.append("li").text(`wfreq: ${wfreq}`);
      })
   })
}
buildMetaData()


function buildGauge() {
   d3.json("/samples").then((metadata) => {
      console.log(metadata)
      
      // Objects of all samples
      var metadata = metadata.metadata;
      // console.log(metadata)

      // Select dropdown values
      var dropdown = d3.select("#selDataset").property("value");

      // Filter data based on dropdown value
      var filteredData = metadata.filter(records => records.id == dropdown)
      // console.log(filteredData)

      filteredData.map(record => {
         var id = record.id;
         var wfreq = record.wfreq;

         console.log(wfreq)

         // Create gauge chart
         var data = [
            {
               domain: { x: [0, 1], y: [0, 1] },
               value: wfreq,
               title: { text: "Scrubs per Week" },
               type: "indicator",
               mode: "gauge+number"
            }
         ];
         
         var layout = { width: 600, height: 600, margin: { t: 0, b: 2 } };
         Plotly.newPlot('gauge', data, layout);
      })
   })
}
buildGauge()


//    Recommended function names:
//     optionChanged() 
//     buildChart()
//     buildGauge()
//     buildMetadata()

