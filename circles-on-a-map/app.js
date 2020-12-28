// import { colorLegend } from "./colorLegend.js";
import { loadAndProcessData } from "./loadAndProcessData.js";

const svg = d3.select("svg");

// manipulate the map by changing the projection
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
const radiusScale = d3.scaleSqrt();
const radiusValue = (d) => d.properties["2018"];

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

loadAndProcessData().then((countries) => {
  radiusScale
    .domain([0, d3.max(countries.features, radiusValue)])
    .range([0, 20]);
  // countries path
  g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", (d) => pathGenerator(d))
    .attr("fill", (d) => (d.properties["2018"] ? "green" : "red"))
    .append("title")
    .text((d) => d.id);

  countries.featuresWithPopulation.forEach((d) => {
    d.properties.projected = projection(d3.geoCentroid(d));
  });
  // geoCentroid are long and lats of center points
  g.selectAll("circle")
    .data(countries.featuresWithPopulation)
    .enter()
    .append("circle")
    .attr("class", "country-circle")
    .attr("cx", (d) => d.properties.projected[0])
    .attr("cy", (d) => d.properties.projected[1])
    .attr("r", (d) => radiusScale(radiusValue(d)));
});
