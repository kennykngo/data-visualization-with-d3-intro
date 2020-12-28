import { sizeLegend } from "./sizeLegend.js";
import { loadAndProcessData } from "./loadAndProcessData.js";

const svg = d3.select("svg");

// manipulate the map by changing the projection
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
const radiusValue = (d) => d.properties["2018"];

// globe path
const g = svg.append("g");

// map is appended first then the legend is overlayed
const colorLegendG = svg.append("g").attr("transform", `translate(60, 240)`);

g.append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

svg.call(
  d3.zoom().on("zoom", (event) => {
    g.attr("transform", event.transform);
  })
);

loadAndProcessData().then((countries) => {
  const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(countries.features, radiusValue)])
    .range([0, 33]);

  // countries path
  g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", (d) => pathGenerator(d))
    .attr("fill", (d) => (d.properties["2018"] ? "#d8d8d8" : "#fec1c1"))
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
    .attr("r", (d) => sizeScale(radiusValue(d)));

  g.append("g")
    .attr("transform", `translate(50, 150)`)
    .call(sizeLegend, {
      sizeScale,
      spacing: 45,
      textOffset: 10,
      numTicks: 5,
      // circleFill: "rgba(0, 0, 0, 0.5)",
      tickFormat: d3.format(","),
    });
});
