import { dropdownMenu } from "./dropdownMenu.js";
import { scatterPlot } from "./scatterPlot.js";

const svg = d3.select("svg");

// append method will append new DOM elements
// will append the element into the svg element

const height = +svg.attr("height");
const width = +svg.attr("width");

let data;
let xColumn;

const onXColumnClicked = (column) => {
  xColumn = column;
  render();
};

const render = () => {
  d3.select("#menus").call(dropdownMenu, {
    options: data.columns,
    onOptionClicked: onXColumnClicked,
  });

  //
  svg.call(scatterPlot, {
    xValue: (d) => d[xColumn],
    xAxisLabel: xColumn,
    yValue: (d) => d.weight,
    yAxisLabel: "Weight",
    circleRadius: 18,
    margin: { top: 60, right: 40, bottom: 88, left: 150 },
    width,
    height,
    data,
  });
};

d3.csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then((loadedData) => {
  data = loadedData;
  data.forEach((d) => {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year;
  });
  // after data is loaded, the first column is assigned to xColumn
  xColumn = data.columns[0];
  // console.log(data);
  render();
});
