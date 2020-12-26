import { colorLegend } from "./colorLegend.js";
import { loadAndProcessData } from "./loadAndProcessData.js";

const svg = d3.select("svg");

// manipulate the map by changing the projection
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

// globe path
const g = svg.append("g");

// map is appended first then the legend is overlayed
const colorLegendG = svg.append("g").attr("transform", `translate(30, 300)`);

g.append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

svg.call(
  d3.zoom().on("zoom", (event) => {
    g.attr("transform", event.transform);
  })
);

const colorScale = d3.scaleOrdinal();
// can edit to income_grp
const colorValue = (d) => d.properties.economy;

let selectedColorValue;
let features;

const onClick = (d) => {
  selectedColorValue = d;
  render();
};

// console.log(onClick(null));

loadAndProcessData().then((countries) => {
  features = countries.features;
  render();
});

const render = () => {
  // setting the domain to a set of unique values then sorting
  colorScale
    .domain(features.map(colorValue))
    // reverses the array so that the most developed is blue
    .domain(colorScale.domain().sort().reverse())
    .range(d3.schemeSpectral[colorScale.domain().length]);

  colorLegendG.call(colorLegend, {
    colorScale,
    circleRadius: 8,
    spacing: 20,
    textOffset: 12,
    backgroundRectWidth: 235,
    onClick,
    selectedColorValue,
  });

  // countries path
  g.selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", (d) => pathGenerator(d))
    .attr("fill", (d) => colorScale(colorValue(d)))
    .append("title")
    .text((d) => d.properties.name + ": " + colorValue(d));
};
