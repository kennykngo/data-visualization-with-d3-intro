// import { select } from "d3";

const svg = d3.select("svg");

svg.style("background-color", "red");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const circle = svg
  .append("circle")
  .attr("r", height / 2)
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("fill", "yellow")
  .attr("stroke", "black");

const eyeSpacing = 100;
const eyeYOffset = -70;

const leftEye = svg
  .append("circle")
  .attr("r", 30)
  .attr("cx", width / 2 - eyeSpacing)
  .attr("cy", height / 2 + eyeYOffset)
  .attr("fill", "black");

const rightEye = svg
  .append("circle")
  .attr("r", 30)
  .attr("cx", width / 2 + eyeSpacing)
  .attr("cy", height / 2 + eyeYOffset)
  .attr("fill", "black");
