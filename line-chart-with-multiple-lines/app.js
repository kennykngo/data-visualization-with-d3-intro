import { colorLegend } from "./colorLegend.js";
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

  const colorValue = (d) => d.city;

  const title = "A week of Temperature Around the World";
  const margin = { top: 60, right: 220, bottom: 88, left: 105 };
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

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

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

  const nested = d3.nest().key(colorValue).entries(data);
  console.log(nested);

  colorScale.domain([nested.map((d) => d.key)]);

  // chart maker
  g.selectAll(".line-path")
    .data(nested)
    .enter()
    .append("path")
    .attr("class", "line-path")
    .attr("d", (d) => lineGenerator(d.values))
    .attr("stroke", (d) => colorScale(d.key));

  g.append("text").attr("y", -10).text(title).attr("class", "title");

  svg.append("g").attr("transform", `translate(735, 121)`).call(colorLegend, {
    colorScale,
    circleRadius: 13,
    spacing: 30,
    textOffset: 40,
  });
};

d3.csv(
  "https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv"
).then((data) => {
  data.forEach((d) => {
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp);
  });

  // console.log(data);
  render(data);
});
