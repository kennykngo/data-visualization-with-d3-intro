// import { select, arc } from "d3";
// import arc from "d3";

const svg = d3.select("svg");

svg.style("background-color", "red");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const g = svg
  .append("g")
  .attr("transform", `translate(${width / 2} , ${height / 2})`);

const circle = g
  .append("circle")
  .attr("r", height / 2)
  .attr("fill", "yellow")
  .attr("stroke", "black");

const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 40;
const eyebrowWidth = 70;
const eyebrowHeight = 15;
const eyebrowYOffset = -70;

const eyesG = g.append("g").attr("transform", `translate(0, ${eyeYOffset})`);

const leftEye = eyesG
  .append("circle")
  .attr("r", eyeRadius)
  .attr("cx", -eyeSpacing);

const rightEye = eyesG
  .append("circle")
  .attr("r", eyeRadius)
  .attr("cx", eyeSpacing);

const leftEyebrow = eyesG
  .append("rect")
  .attr("x", -eyeSpacing - eyebrowWidth / 2)
  .attr("y", eyebrowYOffset)
  .attr("width", eyebrowWidth)
  .attr("height", eyebrowHeight);

const rightEyebrow = eyesG
  .append("rect")
  .attr("x", eyeSpacing - eyebrowWidth / 2)
  .attr("y", eyebrowYOffset)
  .attr("width", eyebrowWidth)
  .attr("height", eyebrowHeight)
  .transition()
  .duration(2000)
  .attr("y", eyebrowYOffset - 30);

const mouth = g.append("path").attr(
  "d",
  d3
    .arc()
    .innerRadius(150)
    .outerRadius(170)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2)
);
