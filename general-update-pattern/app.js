// import { range, select } from "d3"
import { colorLegend } from "./colorLegend.js";

const svg = d3.select("svg");

const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon", "lime", "orange"])
  .range(["#c11d1d", "#eae600", "green", "orange"]);

svg
  .append("g")
  .attr("transform", `translate(100, 100)`)
  .call(colorLegend, {
    colorScale,
    height: +svg.attr("height"),
    circleRadius: 30,
    spacing: 80,
    textOffset: 40,
  });
