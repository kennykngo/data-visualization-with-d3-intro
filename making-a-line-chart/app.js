const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const render = (data) => {
  const xValue = (d) => d.timestamp;
  const xAxisLabel = "Time";

  const yValue = (d) => d.temperature;
  const yAxisLabel = "Temperature";

  const title = "A week in San Francisco";
  const circleRadius = 6;
  const margin = { top: 60, right: 40, bottom: 88, left: 150 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleTime()
    // extent returns an array of max and min
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // const xAxisTickFormat = (number) =>
  //   d3.format(".3s")(number).replace("G", "B");

  const xAxis = d3
    .axisBottom(xScale)
    // .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)
    .tickPadding(15);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
    .tickFormat(d3.format(".2s"));
  const yAxisG = g.append("g").call(yAxis);

  yAxisG.selectAll(".domain").remove();

  // bottom axis
  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${innerHeight})`);

  xAxisG.select(".domain").remove();
  // yAxis(g.append("g"));

  yAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("x", -innerHeight / 2)
    .attr("y", -93)
    .attr("transform", `rotate(-90)`)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  xAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth / 2)
    .attr("y", 75)
    .text(xAxisLabel)
    .attr("fill", "black");

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(d3.curveBasis);

  console.log(lineGenerator(data));

  // chart maker
  g.append("path")
    .attr("class", "line-path")
    .attr("d", lineGenerator(data))
    .attr("stroke", "black");

  g.append("text").attr("y", -10).text(title).attr("class", "title");
};

d3.csv(
  "https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv"
).then((data) => {
  data.forEach((d) => {
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp);
  });

  // console.log(data);
  render(data);
});
