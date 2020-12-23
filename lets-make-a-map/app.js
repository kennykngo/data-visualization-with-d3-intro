// import { select, arc } from "d3";
// import arc from "d3";
// import { select } from "https://unpkg.com/d3@6.3.1/dist/d3.min.js?module";

// const topojson = require("")

const svg = d3.select("svg");

// manipulate the map by changing the projection
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

// globe path
svg
  .append("path")
  .attr("d", pathGenerator({ type: "Sphere" }))
  .attr("class", "sphere");

d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((data) => {
  const countries = topojson.feature(data, data.objects.countries);
  console.log(countries);
  console.log(data);

  // countries path
  svg
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", (d) => pathGenerator(d));
});
