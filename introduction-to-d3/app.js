// import { select } from "d3";

const svg = d3.select("svg");

svg.style("background-color", "red");

// append method will append new DOM elements
// will append the element into the svg element
const circle = svg.append("circle");

const height = svg.height;
const width = 960;

circle.attr("r", height / 2);
circle.attr("cx", 960 / 2);
circle.attr("cy", height / 2);
