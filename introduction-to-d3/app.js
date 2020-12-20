// import { select } from "d3";

const svg = d3.select("svg");

svg.style("background-color", "red");

// append method will append new DOM elements
// will append the element into the svg element
const circle = svg.append("circle");

const height = +svg.attr("height");
const width = +svg.attr("width");

console.log(typeof width);

console.log(svg.attr("width"));

circle
  .attr("r", height / 2)
  .attr("cx", width / 2)
  .attr("cy", height / 2);
