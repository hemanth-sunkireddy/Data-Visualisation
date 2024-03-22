// Declare the chart dimensions and margins.
const width = 300;
const height = 300;
const marginTop = 50;
const marginRight = 50;
const marginBottom = 50;
const marginLeft = 50;

// Declare the x (horizontal position) scale.
const x = d3.scaleLinear()
    .domain([0, 100])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis without transition.
const gx = svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
const gy = svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Adding X Axis title.
svg.append("text")
  .attr("x", "-90")
  .attr("y", "20")
  .attr("transform", "rotate(-90,20,20)")
  .text("y-axis");

// Adding Y Axis title 
svg.append("text")
  .attr("x", "100")
  .attr("y", "300")
  .text("x-axis");


// Add the path using this helper function
svg.append('rect')
    .attr('x', 50)
    .attr('y', 100)
    .attr('width', 200)
    .attr('height', 40)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');

// Append the SVG element.
first_row.append(svg.node());
