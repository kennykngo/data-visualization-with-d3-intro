export const scatterPlot = (selection, props) => {
  const {
    xValue,
    xAxisLabel,
    yValue,
    yAxisLabel,
    circleRadius,
    margin,
    width,
    height,
    data,
  } = props;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    // extent returns an array of max and min
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  const g = selection.selectAll(".container").data([null]);
  const gEnter = g.enter().append("g").attr("class", "container");
  gEnter.merge(g).attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xAxisTickFormat = (number) =>
    d3.format(".3s")(number).replace("G", "B");

  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)
    .tickPadding(15);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
    .tickFormat(d3.format(".2s"));

  const yAxisG = g.select(".y-axis");
  const yAxisGEnter = gEnter.append("g").attr("class", "y-axis");
  yAxisG.merge(yAxisGEnter).call(yAxis).selectAll(".domain").remove();

  const yAxisLabelText = yAxisGEnter
    .append("text")
    .attr("class", "axis-label")
    .attr("x", -innerHeight / 2)
    .attr("y", -93)
    .attr("transform", `rotate(-90)`)
    .attr("fill", "black")
    // update the existing axis-label class
    .merge(yAxisG.select(".axis-label"))
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  // x axis
  const xAxisG = g.select(".x-axis");
  const xAxisGEnter = gEnter.append("g").attr("class", "x-axis");
  xAxisG
    .merge(xAxisGEnter)
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis)
    .selectAll(".domain")
    .remove();

  const xAxisLabelText = xAxisGEnter
    .append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth / 2)
    .attr("y", 75)
    .attr("fill", "black")
    // update the existing axis-label class
    .merge(xAxisG.select(".axis-label"))
    .text(xAxisLabel);
  // x-axis end

  // allows for circles to appear on the first invocation
  const circles = g.merge(gEnter).selectAll("circle").data(data);

  circles
    .join("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    // .attr("width", (d) => xScale(d.population))
    .attr("r", circleRadius);
};
