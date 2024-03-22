document.addEventListener('DOMContentLoaded', async function () {
    const yearSlider = document.getElementById('yearSlider');
    let year = yearSlider.value;

    // Declare the chart dimensions and margins.
    const width = 300;
    const height = 300;
    const marginTop = 50;
    const marginRight = 50;
    const marginBottom = 50;
    const marginLeft = 50;

    // Loading CSV File here.
    const data = await d3.csv("../data_sets/yearwise.csv");

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height);

    // Append the SVG element.
    scatter_graph.append(svg.node());

    // Function to update slider id
    async function updateSliderId() {
        year = yearSlider.value;

        // Remove previous y-axis elements
        svg.selectAll(".yaxis").remove();

        // Declare the x (horizontal position) scale.
        const x = d3.scaleBand()
            .domain(data.map(d => d.Name))
            .range([marginLeft, width - marginRight + 50])
            .padding(1);

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d['X' + year])])
            .range([height - marginBottom, marginTop]);

        // Add the x-axis without transition.
        const gx = svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x));

        // Add the y-axis with transition.
        const gy = svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .attr("class", "yaxis")
            .call(d3.axisLeft(y));

        // Update X Axis title.
        svg.selectAll("text.xaxis").remove();
        svg.append("text")
            .attr("class", "xaxis")
            .attr("x", width / 2)
            .attr("y", height - marginBottom + 40)
            .attr("text-anchor", "middle")
            .text("Name " + year);

        // Update Y Axis title.
        svg.selectAll("text.yaxis").remove();
        svg.append("text")
            .attr("class", "yaxis")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", marginLeft - 35)
            .attr("text-anchor", "middle")
            .text("Value");

        // Remove previous circles
        svg.selectAll("circle").remove();

        // Add a circle for each data point.
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.Name); })
            .attr("cy", function (d) { return y(d['X' + year]); })
            .attr("r", function (d) { return d[('R' + year)] * 2; })
            .attr("class", function (d, i) {
                return "point" + i
            })

            .on("mouseover", function (event, d, i) {
                svg.selectAll("rect").attr("fill", "steelblue");
                let point = this.getAttribute('class');
                console.log(point);
                d3.select("rect." + point).attr("fill", "orange");
                d3.select(this).attr("fill", "orange");
                tooltipCircle.html(`Name: ${d.Name}<br/>Value: ${d['X' + year]}<br/> Radius: ${d['X' + year]}`)
                    .style("left", (event.pageX + 20) + "px")
                    .style("top", (event.pageY - 20) + "px")
                    .style("opacity", 1)
                    .style('visibility', "visible");

                // Select the corresponding rectangle tooltip
                tooltipRectangle.html(`Name: ${d.Name}<br/>Value: ${d['X' + year]}<br/>Radius: ${d['R' + year]}`)
                .style("left", (event.pageX - 400) + "px")
                .style("top", (event.pageY - 20) + "px")
                .style("opacity", 1)
                .style('visibility', "visible");

            })
            .on("mouseout", (d) => {
                d3.selectAll("circle")
                    .attr("fill", "steelblue");
                tooltipCircle.style('visibility', "hidden");
                d3.selectAll("rect").attr("fill", "steelblue");
                tooltipRectangle.style('visibility', "hidden");
            });

        // Adding Tool Tip to the Graphs
        const tooltipCircle = d3.select("#scatter_graph").append("div")
            .attr("class", "tooltipCircle")
            .style("opacity", 1)
            .style("position", "absolute");

        // Adding Tool Tip to the Graphs
        const tooltipRectangle = d3.select("#bar_graph").append("div")
            .attr("class", "tooltipRectangle")
            .style("opacity", 1)
            .style("position", "absolute")
            .attr('visibility', "hidden");

    }

    // Initial update
    await updateSliderId();

    // Adding event listener to update slider id when value changes
    yearSlider.addEventListener('input', updateSliderId);

});
