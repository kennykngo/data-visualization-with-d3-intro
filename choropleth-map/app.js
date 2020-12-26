// import { select, arc } from "d3";
// import arc from "d3";
// import { select } from "https://unpkg.com/d3@6.3.1/dist/d3.min.js?module";

// const topojson = require("")
import { loadAndProcessData } from "./loadAndProcessData.js";

const svg = d3.select("svg");

// manipulate the map by changing the projection
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

// globe path
const g = svg.append("g");

g.append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

svg.call(
  d3.zoom().on("zoom", (event) => {
    g.attr("transform", event.transform);
  })
);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const colorValue = (d) => d.properties.economy;

loadAndProcessData().then((countries) => {
  // setting the domain to a set of unique values then sorting
  colorScale
    .domain(countries.features.map(colorValue))
    .domain(colorScale.domain().sort());

  // countries path
  g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", (d) => pathGenerator(d))
    .attr("fill", (d) => colorScale(colorValue(d)))
    .append("title")
    .text((d) => d.properties.name);
});
