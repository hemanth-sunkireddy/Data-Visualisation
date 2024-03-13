// Declare the chart dimensions and margins.
const width = 300;
const height = 300;
const marginTop = 50;
const marginRight = 50;
const marginBottom = 50;
const marginLeft = 50;

// Loading CSV File here. 
const data = await d3.csv("../data_sets/books.csv");
console.log(data);

// Declare the x (horizontal position) scale.
const x = d3.scaleBand()
    .domain(data.map(d => d.book_code))
    .range([marginLeft, width - marginRight])
    .padding(1);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.price)])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis without transition.
const gx = svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis with transition.
const gy = svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Adding X Axis title.
svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - marginBottom + 40)
    .attr("text-anchor", "middle")
    .text("Book Code");

// Adding Y Axis title 
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", marginLeft - 20)
    .attr("text-anchor", "middle")
    .text("Price");

// Add a rect for each bar.
svg.selectAll("circle")
   .data(data).enter()
   .append("circle")
   .attr("cx", function(d){return x(d.book_code)})
   .attr("cy", function(d) {return y(d.price)})
   .attr("r", 4)




// Append the SVG element.
load_csv.append(svg.node());
