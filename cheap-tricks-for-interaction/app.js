// import { select, arc } from "d3";
// import arc from "d3";
// import { select } from "https://unpkg.com/d3@6.3.1/dist/d3.min.js?module";

// const topojson = require("")

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

// Waits for ALL of the promises to resolve (an array) then destructures the promise
Promise.all([
  d3.tsv("https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"),
  d3.json("https://unpkg.com/world-atlas@1.1.4/world/50m.json"),
]).then(([tsvData, topoJSONdata]) => {
  const countryName = tsvData.reduce((acc, d) => {
    acc[d.iso_n3] = d.name;
    return acc;
  }, {});
  /* const countryName = {};
    tsvData.forEach((d) => {
      countryName[d.iso_n3] = d.name;
    }); */

  const countries = topojson.feature(
    topoJSONdata,
    topoJSONdata.objects.countries
  );

  console.log(countries);

  // countries path
  g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", (d) => pathGenerator(d))
    .append("title")
    .text((d) => countryName[d.id]);
});
