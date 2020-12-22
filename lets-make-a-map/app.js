// import { select, arc } from "d3";
// import arc from "d3";
// import { select } from "https://unpkg.com/d3@6.3.1/dist/d3.min.js?module";

const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((data) => {
  const countries = topojson.feature(data, data.objects.countries);
  console.log(data);
});
