// import { select, arc } from "d3";
// import arc from "d3";

const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });
  console.log(data);
});
