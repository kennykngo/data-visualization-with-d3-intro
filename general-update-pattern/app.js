// import { range, select } from "d3"
import { colorLegend } from "./colorLegend.js";

const svg = d3.select("svg");
const height = +svg.attr("height");

const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#eae600"]);

svg
  .append("g")
  .attr("transform", `translate(100, ${height / 2})`)
  .call(colorLegend, {
    colorScale,
    height: +svg.attr("height"),
    circleRadius: 30,
  });
