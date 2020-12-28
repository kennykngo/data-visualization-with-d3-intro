import { loadAndProcessData } from "./loadingAndProcessData.js";
import { colorLegend } from "./colorLegend.js";
const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const render = (data) => {
  const xValue = (d) => d.year;
  const xAxisLabel = "Time";

  const yValue = (d) => d.population;
  const yAxisLabel = "Population";

  const colorValue = (d) => d.name;

  const title = "Population Over Time By Region";
  const margin = { top: 60, right: 280, bottom: 88, left: 105 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleTime()
    // extent returns an array of max and min
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tickFormat = (number) =>
    d3.format(".2s")(number).replace("G", "B").replace(".0", "");

  const xAxis = d3
    .axisBottom(xScale)
    // .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)
    .tickPadding(15);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
    .tickFormat(tickFormat);
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

  console.log(yValue);
  const lastYValue = (d) => yValue(d.values[d.values.length - 1]);

  const nested = d3
    .nest()
    .key(colorValue)
    .entries(data)
    .sort((b, a) => d3.ascending(lastYValue(a), lastYValue(b)));
  console.log(nested);

  colorScale.domain(nested.map((d) => d.key));

  // chart maker
  g.selectAll(".line-path")
    .data(nested)
    .enter()
    .append("path")
    .attr("class", "line-path")
    .attr("d", (d) => lineGenerator(d.values))
    .attr("stroke", (d) => colorScale(d.key));

  g.append("text").attr("class", "title").attr("y", -10).text(title);

  svg.append("g").attr("transform", `translate(735, 121)`).call(colorLegend, {
    colorScale,
    circleRadius: 10,
    spacing: 55,
    textOffset: 15,
  });
};

loadAndProcessData().then(render);
