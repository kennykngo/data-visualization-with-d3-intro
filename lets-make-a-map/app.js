// import { select, arc } from "d3";
// import arc from "d3";
// import { select } from "https://unpkg.com/d3@6.3.1/dist/d3.min.js?module";

// const topojson = require("")

const svg = d3.select("svg");

const projection = d3.geoMercator();
const pathGenerator = d3.geoPath().projection(projection);

d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((data) => {
  const countries = topojson.feature(data, data.objects.countries);
  console.log(countries);
  console.log(data);

  svg
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", (d) => pathGenerator(d));
});
