/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 



// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
// adding svg to hard coded bar and sets width, height, and viewbox
const svg1 = d3.select("#hard-coded-bar").append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


//const data1 = d3.csv("barchart.csv", function(data){
//    console.log(data)
//});

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? 
// looks at data1 and pulls max
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do?   
// sets a scaling function for the y axis for data values to pixel values
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
// sets a scaling function for the x axis for data values to pixel values, adds padding
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
// takes svg1, append a generic svg to it, and makes the axis for us and make the font larger
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do? 
// takes svg1, append a generic svg to it, translate to the spot we want it, use axisBottom to add x-axis, also use tickFormat to set the name at each tick (whatever row we are on, and pull name)
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// selecting hard coded bar and appending div to it with ID tooltip 1, with 0 opacity and class "toooltip"
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do? 
// uses tooltip we just created and display information when we hover over, then sets opacity to 1 so we can see it
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// positions the tooltip a bit offset from the mouse, moves with the mouse
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
// when the mouse leaves the bar, the opacity of the tooltip is 0
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
// look at svg1 and select everything from the class bar, empty selection, appends a rectangle to svg1 for each placeholder(row), adds attribute class - make it bar, scales x position of a rectangle, setting y position of each of the rectagles as the y position of each score map, set height and width of each bar, bandwith automatically sets width of bars based on how many there are, add event listener to the bars and calls actions to handle events when mouse is moved
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);








