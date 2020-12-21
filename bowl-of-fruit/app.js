// import { select, arc } from "d3";
// import arc from "d3";

const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#eae600"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);

const render = (selection, { fruits }) => {
  const circles = selection
    // .selectAll("circle") is an empty selection
    .selectAll("circle")
    // .data(ARRAY) sets up data section of data join
    .data(fruits);

  circles
    .join(
      (enter) => enter.append("circle"),
      (update) =>
        update
          .attr("fill", (d) => colorScale(d.type))
          .attr("r", (d) => radiusScale(d.type)),
      (exit) => exit.remove()
    )
    .attr("cx", (d, i) => i * 120 + 60)
    .attr("cy", height / 2)
    .attr("fill", (d) => colorScale(d.type))
    .attr("r", (d) => radiusScale(d.type));

  // circles.data(fruits).exit().remove();
};

const makeFruit = (type) => ({ type });

const fruits = d3.range(5).map(() => makeFruit("apple"));

// console.log(fruits);
render(svg, { fruits });

setTimeout(() => {
  fruits.pop();

  render(svg, { fruits });
}, 1000);

// replacing an apple with a lemon
setTimeout(() => {
  fruits[2].type = "lemon";

  render(svg, { fruits });
}, 2000);
