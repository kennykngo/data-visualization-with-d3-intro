// import { select, arc } from "d3";
// import arc from "d3";

const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const render = (data) => {
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, width]);

  const yScale = d3.scaleBand().domain(data.map(yValue)).range([0, height]);

  console.log(yScale.domain());

  console.log(xScale.range());
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("y", (d) => yScale(yValue(d)))
    // .append("rect")
    .attr("width", (d) => xScale(xValue(d)))
    // .attr("width", (d) => xScale(d.population))
    .attr("height", yScale.bandwidth());
};

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });
  render(data);
});
