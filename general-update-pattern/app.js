// import { range, select } from "d3"
import { colorLegend } from "./colorLegend.js";

const svg = d3.select("svg");

const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#eae600"]);

colorLegend(svg, {
  colorScale,
  height: +svg.attr("height"),
  circleRadius: 30,
});
